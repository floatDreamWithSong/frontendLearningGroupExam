import { OnTestFailedHandler, RunnerTaskResult, test } from "vitest";
import { GetFnTypeByName, Question } from "../types";
import { Judgement } from "./judgement";
interface IsetQuestion<T extends Question> {
    testQuestionName: T
    testFn: (answer: GetFnTypeByName<T>, ...args: any[]) => any
    failedCallback?: OnTestFailedHandler
}
export const printError = (str: string, e: RunnerTaskResult) => console.error(str, e.errors?.map(i => i.message))
export const setQuestion = <T extends Question>({
    testQuestionName,
    testFn,
    failedCallback
}: IsetQuestion<T>) => {
    Judgement.reg<T>(testQuestionName, (fn) =>
        test(`测试 ${testQuestionName}`, ({ onTestFailed, onTestFinished }) => {
            console.log(`正在测试：${testQuestionName}...`)
            onTestFailed(
                failedCallback === undefined
                    ? (e) => printError(`${testQuestionName} 出现错误，错误信息：\n`, e)
                    : failedCallback)
            testFn(fn)
            onTestFinished(() => {
                if (Math.random()) {
                    console.log(`${testQuestionName}测试结束`)
                }
            })
        })
    )
}