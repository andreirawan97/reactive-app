import jwt from 'jsonwebtoken';

const privateKey: jwt.Secret = 'hush'; // TODO: Find a safest way to store this

export function encodeToken(payload: string | object | Buffer) {
  return jwt.sign(payload, privateKey);
}

export function decodeToken<ReturnType>(
  token: string,
): string | object | ObjectOf<ReturnType> {
  try {
    return jwt.verify(token, privateKey);
  } catch {
    return '';
  }
}
