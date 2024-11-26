# 博远信息技术社前端学习小组测验

## 项目结构

``` 源项目结构
└── 📁vite-pak-demo
    └── 📁lib
        └── 📁func
            └── index.ts
            └── judgement.ts
        └── 📁test
            └── test.ts
        └── 📁types
            └── index.ts
            └── questiones.ts # 出题人设置题目类型声明的地方
        └── answer.ts # 出题人可在此调试自己给的标准答案
        └── index.ts
        └── questiones.ts # 出题人设置题目测试点的地方
    └── 📁public
        └── vscode.png
        └── web.png
    └── 📁src
        └── main.js # 作答者答题的区域，若需要使用ts可以把它改成.ts文件
        └── main.spec.ts
        └── vite-env.d.ts
    └── .env.test # 环境变量
    └── .gitignore
    └── index.html
    └── package-lock.json
    └── package.json # 可在scripts中查看可运行的命令
    └── pnpm-lock.yaml
    └── README.md
    └── tsconfig.json
    └── vite.config.ts
```

## 答题者使用

### 安装测试包

#### git clone 模板

直接用 git 把仓库克隆下来，然后安装依赖，比如执行`pnpm i`等
然后在`src/main.js`或者修改为`src/main.ts`，然后在其中编写你的答案
终端执行脚本，比如`npm run test`或者`pnpm web`等

优点是比较方便，缺点是新题目发布在仓库时，本地git同步后，可能会产生git冲突，需要重新clone一个项目会比较保险

#### npm包安装


1. 随便新建一个文件夹并在终端打开，初始化npm后（可以执行`npm init`等），项目安装boyuan-frontest包：`npm i boyuan-frontest`。备注：如果使用pnpm等，可能会因为你的pnpm配置问题没有下载到boyuan-frontest的依赖，请确保你的node_modules安装了：
  - vitest
  - @vitest/ui (可选)
2. 项目新建任意`.spec.js`或者`.spec.ts`后缀的文件，在里面填写如下模板

```js
import { start } from 'vite-test-pak';
import { answerQuestion } from 'vite-test-pak';

start({
    main: () => {
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
      }
})

```

4. package.json添加如下字段，记得删注释：

```json
  "scripts": {
    "test": "vitest", // 开始测试
    "once": "vitest -w false", // 开始一次测试
    "web": "vitest --ui" // 这需要安装 @vitest/ui 才可以使用，可以在浏览器中进一步可视化
  },
```
5. 执行脚本，比如`npm run test`或者`pnpm web`等

优点是新题目发布后只需要更新依赖包，例如`pnpm update boyuan-frontend`就可以了，缺点是初始化项目稍微麻烦一点点。

## 出题人使用

> 本测验包需要提前安装node环境

### 安装

1. 将仓库克隆到本地
2. 终端打开项目目录，使用命令`pnpm i --only=dev`下载依赖项。

### CLI使用

1. 终端输入`pnpm test`，开启测试，测试会持续追踪你的文件改动以自动测试。
2. 终端输入`pnpm once`，开启一次测试，测试不会持续追踪你的文件改动。
3. 终端输入`pnpm web`，可以在浏览器中查看测试情况
4. 若有需要，可在VSCode中下载`vitest`插件进一步可视化测试题目的情况，不过个人感觉效果一般。

![在vscode中使用终端的效果](/public/vscode.png)

![在浏览器中查看的效果](/public/web.png)

### 编写题解

5. 在`src`目录下新建任意`.spec.ts`文件，并添加如下快速开始模板编写答案进行测试。本项目开启了Js/Ts混用模式，方便开发者可以选择自己喜欢的语言来测试答案。

```ts
// describe(`用户`, () => { # 如果有需要，你可以在start函数外部套一层describe，以便做一些其他的处理
    start({
        main: () => {
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
          }
    })
// })
```

6. 作答者可以通过`answerQuestion`函数来作答，参数`question`是题目名称，（受到类型支持），参数`answer`会根据你选择的题目来提示你需要作答的函数类型，若添加了测试函数但是暂时不想对它进行测试，可以再在配置里设置`skip`参数为`true`可以跳过测试，不添加此属性时默认为`false`。
7. 若设置的题目预期答案类型比较复杂想要类型支持，可以通过`GetAnswerType<>`工具进行强制类型以获得类型提示支持，例如：

```ts
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
```

### 编写测试点

1. 可在`lib/types/questiones.ts`中设置
  - 题目列表，包括题目名称、作答函数类型
  - 导出自定义的类型供作答者使用
2. 出题人员可在`lib/questiones.ts`，可在此处设置测试函数，测试函数会自动打印测试开始与结束标志，`testQuestionName`属性可从你在`lib/types/questiones.ts`中设置的题目列表中获得类型支持以方便出题者快速选择

```ts
setQuestion({
    testQuestionName: 'A minus B',
    // timeOut: 可选参数，若传入超时时间（单位：ms）,则会在运行超时时抛出错误
    testFn(answer) {
        expect(answer(1, 2), '1-2=3测试失败').toBe(-1)
        expect(answer(2, 2), '2-2=0测试失败').toBe(0)
    },
    //failedCallback,可选传入，不传入此回调会在错误时默认打印错误时的题目和错误信息
})
```

若设置的题目预期答案类型比较复杂想要类型支持，可以通过`GetAnswerType<>`工具进行强制类型以获得类型提示支持，例如：

```ts
setQuestion({
    testQuestionName: 'URL parse',
    testFn(answer) {
        expect(answer('localhost:80?a=1&b=stri')).toEqual({
            location: 'localhost:80',
            paraments: {
                a: 1,
                b: 'stri'
            }
        } as GetAnswerType<'URL parse'>)//（传入对应的题目名称也是受到类型支持以方便快速选择的）
    },
    
})
```

## 现有题目

### A-B问题

**难度：**`入门`

**要求：** 实现一个函数，接受两个数字输入，返回第一个参数减去第二个参数的值。

### URL解析

**难度：**`简单`

对给定URL串进行解析，解析内容包括：
- 参数集合
- 当前相对路径

例如：

```ts
{
    location: 'localhost:80',
    paraments: {
        a: 1,
        b: 'stri'
    }
} 
```

> 可以使用`GetAnswerType<'URL parse'>`来获得返回值类型支持

### 斐波那契数列求解

**难度：**`中等`

这是个老题目了，，
这次我们要实现对第n个斐波那契数字`fibonacci(n)`的求解，
但是要求使用递归的方法，不过这次的递归方法并不是一般的解法...

数据范围：`n<=38`
时间范围：`50ms`

## 附录

1. 有的时候开发者的环境变量会因为IDE检测问题导致显示爆红，不过不影响