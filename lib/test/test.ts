import { expect, test } from 'vitest'
import { GetFnTypeByName, Problem } from "../types";
import { printError } from '../func';
import { Judgement } from '../func/question';

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
export const addTestFunction = <T extends Exclude<Problem, 'test'>>(problemName: T, fn: GetFnTypeByName<T>) => {
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
    selectedProblems: Exclude<Problem, 'test'>[]
}) => {
    Tester.reg('test', (a: number, b: number) => {
        return a + b;
    })
    test('检测自动化单元测试是否可用', ({ onTestFailed, onTestFinished }) => {
        onTestFailed((e) => printError('自动化单元测试的加法测试发生错误，错误信息：\n', e))
        expect.soft(Tester.get('test')(1, 2), '加法测试1+2=3失败').toBe(3)
        expect(Tester.get('test')(2, 2), '加法测试2+2=4失败').toBe(4)
        onTestFinished(() => {
            console.log('自动化单元测试可用性的测试结果上传中...')
        })
    })
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