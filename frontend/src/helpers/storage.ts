export function setToStorage(key: string, value: unknown) {
  return localStorage.setItem(key, String(value));
}

export function getFromStorage(key: string) {
  return localStorage.getItem(key);
}

export function clearStorage() {
  localStorage.clear();
}
