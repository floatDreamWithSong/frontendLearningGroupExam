import { expect, TaskResult, test } from 'vitest'
import { GetFnTypeByName, Problem } from "../types";

class Tester {
    static pool = new Map<Problem, (...args: any[]) => any>();
    static reg = <T extends Problem>(name: T, fn: GetFnTypeByName<T>) => {
        this.pool.set(name, fn);
    }
    static get = <T extends Problem>(name: T) => {
        return this.pool.get(name) as GetFnTypeByName<T>
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
const printError = (str: string, e: TaskResult) => console.error(str, e.errors?.map(i => i.message))
/**
 * 添加到你的vitest的describe中以启动测试
 * @param fn 你的答案函数所处函数
 */
export const start = (fn?: (...args: any[]) => any) => {
    addTestFunction('add', (a: number, b: number) => {
        return a + b;
    })
    test('检测自动化单元测试是否可用', ({ onTestFailed, onTestFinished }) => {
        onTestFailed((e) => printError('自动化单元测试的加法测试发生错误，错误信息：\n', e))
        expect.soft(Tester.get('add')(1, 2), '加法测试1+2=3失败').toBe(3)
        expect(Tester.get('add')(2, 2), '加法测试2+2=4失败').toBe(4)
        onTestFinished(() => {
            console.log('自动化单元测试可用性的测试结果上传中...')
        })
    })
    fn ? fn() : 0;
    test('题目：A-B问题', ({ onTestFailed, onTestFinished }) => {
        onTestFailed((e) => printError('A-B问题，发生错误，错误信息：\n', e))
        expect.soft(Tester.get('sub')(1, 2), 'A-B问题，测试1-2=-1失败').toBe(-1)
        expect(Tester.get('sub')(2, 2), 'A-B问题，测试2-2=0失败').toBe(0)
        onTestFinished(() => {
            console.log('A-B问题测试结果上传中...')
        })
    })
}