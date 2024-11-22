import { expect } from "vitest";
import { setQuestion } from "./func";
import { GetAnswerType } from "./types";
export const EnableTest = () => {
    setQuestion({
        testQuestionName: 'A minus B',
        testFn(answer) {
            expect(answer(1, 2), '1-2=3测试失败').toBe(-1)
            expect(answer(2, 2), '2-2=0测试失败').toBe(0)
        }
    })
    setQuestion({
        testQuestionName: 'URL parse',
        testFn(answer) {
            expect(answer('localhost:80?a=1&b=stri')).toEqual({
                location: 'localhost:80',
                paraments: {
                    a: 1,
                    b: 'stri'
                }
            } as GetAnswerType<'URL parse'>)
        },

    })
    setQuestion({
        testQuestionName: 'Fibonacci',
        timeOut: 50,
        testFn(answer) {
            const function_text = answer.toString()
            expect(/for\s*\(|while\s*\(/.test(function_text), '本题目要求使用递归求解，而不是使用迭代循环求解，').toBe(false)
            let deep = 40
            let ans = [0, 1]
            for (let index = 2; index <= deep; index++) {
                ans.push(ans[index - 1] + ans[index - 2])
                expect(answer(index), `答案错误, 此时正在求解 fibo[${index}]`).toBe(ans[index])
            }
        },
    })
}