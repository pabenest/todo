export interface WithId {
  id: number;
}

export function findById<T>(type: WithId[], value: T) {
  return type.find(x => x.id === value) ?? null;
}

export function findId(type: WithId[]): number {
  // let maxValue = Number.MIN_VALUE;
  // for (const entree of type) {
  //   if (entree.id > maxValue) {
  //     maxValue = entree.id;
  //   }
  // }

  // let maxValue = Math.max.apply(
  //   null,
  //   type.map(function (o) {
  //     return o.id;
  //   }),
  // );

  let maxValue = 0;
  if (type.length > 0) {
    maxValue = Math.max.apply(
      null,
      type.map(x => x.id),
    );
  }
  maxValue++;

  return maxValue;
}
