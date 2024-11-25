import { GetFnTypeByName, Question } from "../types";
import { Judgement } from '../func/judgement';
import { EnableTest } from '../questiones';

class Tester {
    private static pool = new Map<Question, (...args: any[]) => any>();
    public static reg = <T extends Question>(name: T, fn: GetFnTypeByName<T>) => {
        this.pool.set(name, fn);
    }
    public static get = <T extends Question>(name: T) => {
        return this.pool.get(name) as GetFnTypeByName<T>
    }
    public static getPool() {
        return this.pool
    }
}
/**
 * ### 使用实例
 * ```ts
    answerQuestion({
        question: 'A minus B',
        answer(a, b) {
          return a - b
        },
    })
 * ```
 * @param question 测试问题名
 * @param answer 你的测试函数
 */
export const answerQuestion = <T extends Question>({ question, answer, skip = false }: { question: T, answer: GetFnTypeByName<T>, skip?: boolean }) => {
    if (!skip)
        Tester.reg(question, answer)
};

/**
 * 添加到你的vitest的describe中以启动测试
 * @param main 你的答案函数所处函数
 */
export const start = ({
    main,
}: {
    main: (...args: any[]) => any,
}) => {
    EnableTest()
    if (main === undefined || main === null)
        throw new TypeError("arguments 'main' expected to be 'not null or undefined'")
    main ? main() : 0;
    Tester.getPool().forEach((fn, name) => {
        Judgement.get(name)(fn)
    })
}