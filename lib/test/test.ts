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
 * 
 * @param question 测试问题名
 * @param answer 你的测试函数
 */
export const answerQuestion = <T extends Question>(question: T, answer: GetFnTypeByName<T>) => {
    Tester.reg(question, answer)
};

/**
 * 添加到你的vitest的describe中以启动测试
 * @param fn 你的答案函数所处函数
 */
export const start = ({
    fn,
    selectedQuestions
}: {
    fn: (...args: any[]) => any,
    selectedQuestions: Question[]
}) => {
    EnableTest()
    if (fn === undefined || fn === null)
        throw new TypeError("arguments 'fn' expected to be 'not null or undefined'")
    fn ? fn() : 0;
    if (selectedQuestions.length === 0)
        testAll()
    else
        selectedQuestions.forEach(name => {
            Judgement.get(name)(Tester.get(name))
        })
}

const testAll = () => {
    Tester.getPool().forEach((fn, name) => {
        Judgement.get(name)(fn)
    })
}