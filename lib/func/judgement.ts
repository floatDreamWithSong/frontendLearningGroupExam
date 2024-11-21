import { GetFnTypeByName, Problem } from "../types";

export class Judgement {
    private static pool = new Map<Problem, (...args: any[]) => any>();
    public static reg = <T extends Problem>(name: T, fn: (fn: GetFnTypeByName<T>) => any) => {
        this.pool.set(name, fn);
    }
    public static get = <T extends Problem>(name: T) => {
        const t = this.pool.get(name) as (fn: GetFnTypeByName<T>) => any
        if (t === undefined)
            throw Error(`There is no judgement for question ${name}`)
        return t
    }
}