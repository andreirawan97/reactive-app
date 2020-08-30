export function setStorage(key: string, value: unknown) {
  return localStorage.setItem(key, String(value));
}

export function getStorage(key: string) {
  return localStorage.getItem(key);
}

export function clearStorage() {
  localStorage.clear();
}
