export interface QuestionList {
    'A minus B': (a: number, b: number) => number
    'URL parse': (url: string) => {
        paraments: any,
        location: string
    }
}
