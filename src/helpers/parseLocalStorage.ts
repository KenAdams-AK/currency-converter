export function parseLocalStorageItem<T>(key: string, initialValue: T): T {
  let result: { value: T; expiry: number };
  const jsonValue = localStorage.getItem(key);

  if (jsonValue) {
    result = JSON.parse(jsonValue);
    return result.value;
  }

  return initialValue;
}
