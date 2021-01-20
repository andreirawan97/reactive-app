type RequestMethod = 'GET' | 'POST';

export default async function homebrewFetch(
  method: RequestMethod,
  URL: string,
  requestBody: object | null,
) {
  return fetch(URL, {
    method,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body: requestBody ? JSON.stringify(requestBody) : null,
  });
}
