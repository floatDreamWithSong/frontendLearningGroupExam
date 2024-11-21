interface I {
    'A minus B': (a: number, b: number) => number
    'URL parse': (url: string) => {
        paraments: any,
        location: string
    }
}

export type Problem = keyof I
export type GetFnTypeByName<T extends Problem> = I[T]
export type URLParseReturnType = GetFnTypeByName<'URL parse'> extends (...args: any[]) => infer R ? R : never