export interface IAuthUser {
  username: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  role: string;
  name: string;
  lastName: string;
  dni: string;
  phone: string;
}

export interface IAuthUserRegister {
  username: string;
  password: string;
  email: string;
  name: string;
  lastName: string;
  dni: string;
  phone: string;
}
