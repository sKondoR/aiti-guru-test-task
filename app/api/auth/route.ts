import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Валидация входных данных
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Введите логин и пароль' },
        { status: 400 }
      );
    }

    // Вызов API dummyjson для получения токенов
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
        console.log('here', username, password)
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Ошибка авторизации' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('data', data)

    // // Определяем, где хранить токены
    // const storage = rememberMe ? localStorage : sessionStorage;

    // // Сохраняем токены
    // if (typeof window !== 'undefined') {
    //   storage.setItem('accessToken', data.accessToken || '');
    //   storage.setItem('refreshToken', data.refreshToken || '');
    //   storage.setItem('rememberMe', rememberMe.toString());
    // }

    return NextResponse.json({
      success: true,
      user: {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
      },
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Получаем токены из куки или localStorage/sessionStorage
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Токен не найден' },
        { status: 401 }
      );
    }

    // Проверяем валидность токена через dummyjson API
    const response = await fetch('https://dummyjson.com/auth/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      // Если токен недействителен, пробуем обновить его
      if (refreshToken) {
        const refreshResponse = await fetch('https://dummyjson.com/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken,
            expiresInMins: 30,
          }),
          credentials: 'include',
        });

        if (!refreshResponse.ok) {
          return NextResponse.json(
            { error: 'Токен истек' },
            { status: 401 }
          );
        }

        const refreshData = await refreshResponse.json();

        // Обновляем токены в куки
        const response = NextResponse.json({
          success: true,
          user: {
            id: refreshData.id,
            username: refreshData.username,
            email: refreshData.email,
            firstName: refreshData.firstName,
            lastName: refreshData.lastName,
            gender: refreshData.gender,
            image: refreshData.image,
          },
          accessToken: refreshData.accessToken,
          refreshToken: refreshData.refreshToken,
          rememberMe: false, // При обновлении токена не запоминаем
        });

        response.cookies.set('accessToken', refreshData.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 30 * 60, // 30 минут
        });

        response.cookies.set('refreshToken', refreshData.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 30 * 60,
        });

        return response;
      }

      return NextResponse.json(
        { error: 'Токен истек' },
        { status: 401 }
      );
    }

    const userData = await response.json();

    return NextResponse.json({
      success: true,
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        image: userData.image,
      },
      accessToken,
      refreshToken,
      rememberMe: false, // При проверке токена не запоминаем
    });
  } catch (error) {
    console.error('Check auth error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(_request: NextRequest) {
  try {
    // Удаляем токены из куки
    const response = NextResponse.json({ success: true });

    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    // Удаляем токены из localStorage/sessionStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('rememberMe');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    }

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
