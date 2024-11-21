import { addTestFunction } from "../lib"

export const yourAnswer = () => {
  // 在这里编写你的答案，使用示范：
  //
  // addTestFunction('test',(a: number, b: number)=>{
  //   return a+b;
  // })
  //
  // 第一个参数是可选择的问题名称，第二个参数是你的测试函数
  // 测试函数的类型会根据你的题目名称自动推导出来，请注意你的VSCode的智能类型提示
  // 在控制台使用pnpm test开始测试你的答案
  // 详细见README.md

  addTestFunction('A minus B', (a, b) => {
    return a - b
  })
  addTestFunction('URL parse', (url: string) => {
    const exp_ans = {
      location: 'localhost:80',
      paraments: {
        a: 1,
        b: 'stri'
      }
    }
    return exp_ans
  })
}


