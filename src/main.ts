//在这个文件中添加你的代码， 下面不是函数代码的注释的注释都可以删了
import { addTestFunction } from "../lib"

export const yourAnswer = () => {
  // 在这里编写你的答案，使用示范：
  //
  // addTestFunction('add',(a: number, b: number)=>{
  //   return a+b;
  // })
  //
  // 第一个参数是可选择的问题名称，第二个参数是你的测试函数
  // 测试函数的类型会根据你的题目名称自动推导出来，请注意你的VSCode的智能类型提示
  // 在控制台使用pnpm test开始测试你的答案
  // 详细见README.md
  addTestFunction('sub',(a,b)=>{
    return a-b
  })
}
// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

