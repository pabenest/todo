export interface TypeWithId<T> {
  id: T;
}

export function findById<T>(type: TypeWithId<T>[], value: T) {
  return type.find(x => x.id === value) ?? null;
}
