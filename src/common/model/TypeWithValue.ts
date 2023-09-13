export interface TypeWithValue<T> {
  value: T;
}

export function findByValue<T>(type: TypeWithValue<T>[], value: T) {
  return type.find(x => x.value === value) ?? null;
}
