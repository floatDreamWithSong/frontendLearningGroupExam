import { QuestionList } from "./questiones"

// 此处为工具函数

export type Question = keyof QuestionList
export type GetFnTypeByName<T extends Question> = QuestionList[T]
/**
 * ### 使用方法
 * GetAnswerType<'题目名称'>
 */
export type GetAnswerType<Q extends Question> = ReturnType<GetFnTypeByName<Q>>