export type UnionToArray<U> = U extends any ? U[] : never;

export type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer I) => void
  ? I
  : never;

export type UnionToTuple<T> =
  UnionToIntersection<T extends any ? (t: T) => T : never> extends (
    _: any
  ) => infer W
    ? [...UnionToTuple<Exclude<T, W>>, W]
    : [];
