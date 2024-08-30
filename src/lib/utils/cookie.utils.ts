import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role?: string;
  department?: string;
}

export const decodeToken = (accessToken: string): CustomJwtPayload => {
  return jwtDecode(accessToken);
};

export const isExpired = (exp: number) => {
  const currentTime = Date.now() / 1000;
  return currentTime > exp;
}

export const setCookie = (name: string, value: string) => {
  localStorage.setItem(name, value);
};

export const getCookie = (name: string) => {
  return localStorage.getItem(name);
};

export const deleteCookie = (name: string) => {
  localStorage.removeItem(name);
};

export const clearCookies = () => {
  localStorage.clear();
}
