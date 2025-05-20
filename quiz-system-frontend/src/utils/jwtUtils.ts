import jwtDecode from 'jwt-decode';

interface JwtPayload {
  sub: string;       
  role: string;
  userId: number;
  iat: number;
  exp: number;
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
