export interface AuthUser {
  id: number;
  username: string;
  login: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}