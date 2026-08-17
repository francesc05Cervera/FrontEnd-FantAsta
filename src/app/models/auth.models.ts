export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  userId: number;
  email: string;
  name: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  surname: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  name: string;
  surname: string;
}

export interface UserDTO {
  id: number;
  email: string;
  name: string;
  surname: string;
}
