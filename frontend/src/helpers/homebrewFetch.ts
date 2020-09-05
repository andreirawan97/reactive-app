type RequestMethod = 'GET' | 'POST';

export default async function homebrewFetch(
  method: RequestMethod,
  URL: string,
  requestBody: object,
) {
  return fetch(URL, {
    method,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body: JSON.stringify(requestBody),
  });
}
