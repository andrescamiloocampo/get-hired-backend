export interface UserPayload {
  sub: string;
  email: string;
  iat: string;
  exp: string;
}

export interface ValidationResponse {
  status: boolean;
}
