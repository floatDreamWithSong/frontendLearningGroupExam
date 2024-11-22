import { QuestionList } from "./questiones"

/**
 * 此处为工具函数
 */
export type Question = keyof QuestionList
export type GetFnTypeByName<T extends Question> = QuestionList[T]
export type GetReturnType<F extends (...args: any[]) => any> = F extends (...args: any[]) => infer R ? R : never
export type GetAnswerType<Q extends Question> = GetReturnType<GetFnTypeByName<Q>>