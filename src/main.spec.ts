import { describe } from "vitest";
import { start } from '../lib';
import { yourAnswer as userAnswer } from "./main";
import { yourAnswer as answer } from './../lib/answer';
describe(`用户：${import.meta.env.VITE_USER_NAME}`, () => {
    start({
        fn: import.meta.env.VITE_DEBUGGING_MODE === 'on'
            ? (console.log(`调式模式开启...`), answer)
            : userAnswer,
    })
})