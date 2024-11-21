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
}