import { GetFnTypeByName, Problem } from "../types";
import { Judgement } from '../func/judgement';
import { EnableTest } from '../func/questiones';

class Tester {
    private static pool = new Map<Problem, (...args: any[]) => any>();
    public static reg = <T extends Problem>(name: T, fn: GetFnTypeByName<T>) => {
        this.pool.set(name, fn);
    }
    public static get = <T extends Problem>(name: T) => {
        return this.pool.get(name) as GetFnTypeByName<T>
    }
    public static getPool() {
        return this.pool
    }
}
/**
 * 
 * @param problemName 测试问题名
 * @param fn 你的测试函数
 */
export const addTestFunction = <T extends Problem>(problemName: T, fn: GetFnTypeByName<T>) => {
    Tester.reg(problemName, fn)
};

/**
 * 添加到你的vitest的describe中以启动测试
 * @param fn 你的答案函数所处函数
 */
export const start = ({
    fn,
    selectedProblems
}: {
    fn: (...args: any[]) => any,
    selectedProblems: Problem[]
}) => {
    EnableTest()
    if (fn === undefined || fn === null)
        throw new TypeError("arguments 'fn' expected to be 'not null or undefined'")
    fn ? fn() : 0;
    if (selectedProblems.length === 0)
        testAll()
    else
        selectedProblems.forEach(name => {
            Judgement.get(name)(Tester.get(name))
        })
}

const testAll = () => {
    Tester.getPool().forEach((fn, name) => {
        Judgement.get(name)(fn)
    })
}