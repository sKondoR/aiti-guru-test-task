import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authorizationStore } from 'lib/store/authorizationStore';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Публичные роуты, доступные без авторизации
  const publicRoutes = [
    '/login',
    '/api/auth',
    '/api/auth/callback',
    '/api/auth/logout',
    '/favicon.ico',
    '/robots.txt',
    '/manifest.json',
    '/favicon.svg',
    '/logo.svg',
    '/logo192.png',
    '/logo512.png',
    '/apple-touch-icon.png',
    '/safari-pinned-tab.svg',
    '/browserconfig.xml',
    '/site.webmanifest',
    '/assets',
    '/static',
    '/public',
  ];

  // Если роут публичный, пропускаем
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Проверяем авторизацию
  if (!authorizationStore.isAuthenticated) {
    // Если не авторизован, редиректим на страницу входа
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    
    // Сохраняем URL, на который хотели попасть
    loginUrl.searchParams.set('redirect', pathname);
    
    return NextResponse.redirect(loginUrl);
  }

  // Если авторизован, пропускаем
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Проверяем все роуты, кроме API
    '/((?!api).*)$',
  ],
};