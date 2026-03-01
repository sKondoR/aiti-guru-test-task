export interface AuthUser {
  id: number
  username: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user: AuthUser
  accessToken: string
  refreshToken: string
}

export interface AuthError {
  error: string
}

export interface DummyJsonAuthResponse {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface DummyJsonError {
  message: string
}