import { ApiService } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    return ApiService.post<AuthResponse>('/auth/login', credentials);
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    return ApiService.post<AuthResponse>('/auth/register', userData);
  }

  static async logout(): Promise<void> {
    return ApiService.post<void>('/auth/logout', {});
  }

  static async refreshToken(): Promise<AuthResponse> {
    return ApiService.post<AuthResponse>('/auth/refresh', {});
  }
}
