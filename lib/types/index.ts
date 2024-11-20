export type Problem = 'add' | 'sub'
export type GetFnTypeByName<T extends Problem> =
    T extends 'add' ? (a: number, b: number) => number
    : T extends 'sub' ? (a: number, b: number) => number
    : (...args: any[]) => any