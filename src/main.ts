import { answerQuestion } from "../lib"
import { GetAnswerType } from "../lib/types"

export const yourAnswer = () => {
  // 在这里编写你的答案，使用示范：
  //
  // answerQuestion('test',(a: number, b: number)=>{
  //   return a+b;
  // })
  //
  // 第一个参数是可选择的问题名称，第二个参数是你的测试函数
  // 测试函数的类型会根据你的题目名称自动推导出来，请注意你的VSCode的智能类型提示
  // 在控制台使用pnpm test开始测试你的答案
  // 详细见README.md

  answerQuestion({
    question: 'A minus B',
    answer(a, b) {
      return a - b
    },
  })
  answerQuestion({
    question: 'URL parse',
    answer(url) {
      const exp_ans = {
        location: 'localhost:80',
        paraments: {
          a: 1,
          b: 'stri'
        }
      } as GetAnswerType<'URL parse'>
      return exp_ans
    },
  })
  answerQuestion({
    question: 'Fibonacci',
    // skip: true,
    answer(n) {
      const tail = (i: number, pre_1: number, pre_2: number) => {
        if (i < n) {
          const cur = pre_1 + pre_2
          return tail(i + 1, pre_2, cur)
        }
        return pre_1 + pre_2
      }
      if (n <= 1)
        return n
      else
        return tail(2, 0, 1)
    },
  })
}


