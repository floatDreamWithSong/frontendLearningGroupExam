import { Problem } from "../types";

export class Judgement {
    private static pool = new Map<Problem, (...args: any[]) => any>();
    public static reg = <T extends Problem>(name: T, fn: (...args: any[]) => any) => {
        this.pool.set(name, fn);
    }
    public static get = <T extends Problem>(name: T) => {
        const t = this.pool.get(name)
        if(t===undefined)
            throw Error(`There is no judgement for question ${name}`)
        return t
    }
}