import { describe } from "vitest";
import { start } from './../lib/';
import { yourAnswer } from "./main";
describe('测试开始',()=>{
    // 向start传入你的注册函数
    start({
        fn:yourAnswer,
        userName: 'admin',
        selectedProblems:['sub']
    })
})