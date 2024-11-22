import { it, OnTestFailedHandler, RunnerTaskResult } from "vitest";
import { GetFnTypeByName, Question } from "../types";
import { Judgement } from "./judgement";
interface IsetQuestion<T extends Question> {
    testQuestionName: T
    testFn: (answer: GetFnTypeByName<T>) => any
    failedCallback?: OnTestFailedHandler
    timeOut?: number
}
/**
 * 
 * @param str 错误消息
 * @param e 错误事件
 * @returns 没有啊
 */
export const printError = (str: string, e: RunnerTaskResult) => console.error(str, e.errors?.map(i => i.message))

/**
 * ### 使用示例
 * ```ts
    setQuestion({
        testQuestionName: 'A minus B',
        testFn(answer) {
            expect(answer(1, 2), '1-2=3测试失败').toBe(-1)
            expect(answer(2, 2), '2-2=0测试失败').toBe(0)
        }
    })
 * ```
 */
export const setQuestion = <T extends Question>({
    testQuestionName,
    testFn,
    failedCallback,
    timeOut
}: IsetQuestion<T>) => {
    Judgement.reg<T>(testQuestionName, (fn) =>
        it(`测试 ${testQuestionName}`, {
            timeout: timeOut
        }, async ({ onTestFailed, onTestFinished }) => {
            console.log(`正在测试：${testQuestionName}...`)
            const startTime = new Date().getTime()
            onTestFailed(
                failedCallback === undefined
                    ? (e) => printError(`${testQuestionName} 出现错误，错误信息：\n`, e)
                    : failedCallback)
            testFn(fn)
            onTestFinished(() => {
                const consumedTime = new Date().getTime() - startTime
                if (timeOut !== undefined && timeOut < consumedTime)
                    throw new Error(`${testQuestionName}测试，用时${consumedTime}ms，预期用时${timeOut}ms`)
                else
                    console.log(`${testQuestionName}测试结束，用时${consumedTime}ms`)
            })
        })
    )
}