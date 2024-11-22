import { describe } from "vitest";
import { start } from './../lib/';
import { yourAnswer } from "./main";
//@ts-ignore
describe(`用户：${import.meta.env.VITE_USER_NAME}`,()=>{
    // 向start传入你的注册函数
    start({
        fn:yourAnswer,
    })
})