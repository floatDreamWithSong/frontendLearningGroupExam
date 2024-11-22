import { it, OnTestFailedHandler, RunnerTaskResult } from "vitest";
import { GetFnTypeByName, Question } from "../types";
import { Judgement } from "./judgement";
interface IsetQuestion<T extends Question> {
    testQuestionName: T
    testFn: (answer: GetFnTypeByName<T>) => any
    failedCallback?: OnTestFailedHandler
    timeOut?: number
}
export const printError = (str: string, e: RunnerTaskResult) => console.error(str, e.errors?.map(i => i.message))
export const setQuestion = <T extends Question>({
    testQuestionName,
    testFn,
    failedCallback,
    timeOut = 1000
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
                if (Math.random()) {
                    console.log(`${testQuestionName}测试结束，用时${new Date().getTime() - startTime}ms`)
                }
            })
        })
    )
}