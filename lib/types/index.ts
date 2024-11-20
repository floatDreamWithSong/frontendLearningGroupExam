export type Problem = 'add' | 'self-add'
export type GetFnTypeByName<T extends Problem> =
    T extends 'add' ? (a: number, b: number) => number
    : T extends 'self-add' ? (a: number) => number
    : (...args: any[]) => any