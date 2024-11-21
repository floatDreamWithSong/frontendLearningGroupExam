import { expect } from "vitest";
import { customTest } from ".";
import { URLParseReturnType } from "../types";
export const EnableTest = () => {
    customTest({
        testQuestionName: 'A minus B',
        testFn(answer) {
            expect(answer(1, 2), '1-2=3测试失败').toBe(-1)
            expect(answer(2, 2), '2-2=0测试失败').toBe(0)
        }
    })
    customTest({
        testQuestionName: 'URL parse',
        testFn(answer) {
            const exp_ans: URLParseReturnType = {
                location: 'localhost:80',
                paraments: {
                    a: 1,
                    b: 'stri'
                }
            }
            expect(answer('localhost:80?a=1&b=stri')).toEqual(exp_ans)
        },
    })
}