import { OnTestFailedHandler, RunnerTaskResult, test } from "vitest";
import { GetFnTypeByName, Problem } from "../types";
import { Judgement } from "./judgement";

export const printError = (str: string, e: RunnerTaskResult) => console.error(str, e.errors?.map(i => i.message))
export const customTest = <T extends Problem>({
    testQuestionName,
    testFn,
    failedCallback
}: {
    testQuestionName: T
    testFn: (answer: GetFnTypeByName<T>, ...args: any[]) => any
    failedCallback?: OnTestFailedHandler
}) => {
    Judgement.reg<T>(testQuestionName, (fn) =>
        test(`测试 ${testQuestionName}`, ({ onTestFailed, onTestFinished }) => {
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
