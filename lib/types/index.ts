interface URLParseData {
    paraments: any,
    location: string
}

interface I {
    'test': (a: number, b: number) => number,
    'A minus B': (a: number, b: number) => number
    'URL parse': (url: string) => URLParseData
}

export type Problem = keyof I
export type GetFnTypeByName<T extends Problem> = I[T]
