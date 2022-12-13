import { error } from "console";

export type ApiResponse<T, E> = {
  data: T
  error: E
}


export type TokenResponse = {
  token: string
};

export type User = {
  id: string,
  username: string,
  email: string,
  provider: string,
  created_at: Date,
  updated_at: Date
}

export type MeResponse = {
  user: User
}



export type RegisterUserInput = {
  username: string,
  password: string,
  email: string,
};

export type LoginUserInput = {
  username: string,
  password: string
};

export type LoginError = {
  message: string
}


export const API_URL = process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:8000"




export const signUp = async (userInput: RegisterUserInput): Promise<ApiResponse<TokenResponse, any>> => {
  let res = await fetch(`${API_URL}/api/user/register`, {
    method: "POST",
    body: JSON.stringify(userInput),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const data = await res.json();

  return data
}


export const me = async (token: string): Promise<ApiResponse<MeResponse, any>> => {
  let res = await fetch(`${API_URL}/api/user/me`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return res.json();
}

export const signIn = async (userInput: LoginUserInput): Promise<ApiResponse<TokenResponse, LoginError>> => {
  let res = await fetch(`${API_URL}/api/user/login`, {
    method: "POST",
    body: JSON.stringify(userInput),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  if (res.status === 403) {
    return {
      data: {
        token: ""
      },
      error: {
        message: "invalid credentials"
      }
    }
  }
  const data = await res.json();


  return data
}
