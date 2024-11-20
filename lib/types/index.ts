
interface I {
    'add': (a: number, b: number) => number,
    'sub': (a: number, b: number) => number
}

export type Problem = keyof I
export type GetFnTypeByName<T extends Problem> = I[T]
