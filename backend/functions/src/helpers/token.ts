/**
 *  Token: randomNumber-md5(email)-randomNumber
 *  Request: md5(email-payload)
 */

export function generateTokenForClient(email: string) {
  return `${md5(Math.floor(Math.random() * 11))}-${email}-${md5(
    Math.floor(Math.random() * 11)
  )}`;
}
