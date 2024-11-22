# 博远信息技术社前端学习小组测验

## 使用

> 本项目需要提前安装node环境

### 安装

1. 将仓库克隆到本地
2. 终端打开项目目录，使用命令`pnpm i`下载依赖项。

### 配置

打开`.env.test`，修改`VITE_USER_NAME`为自己的姓名

### CLI使用

1. 终端输入`pnpm test`，开启测试，测试会持续追踪你的文件改动以自动测试。
2. 终端输入`pnpm once`，开启一次测试，测试不会持续追踪你的文件改动。
3. 终端输入`pnpm web`，可以在浏览器中查看测试情况
4. 若有需要，可在VSCode中下载`vitest`插件进一步可视化测试题目的情况，不过个人感觉效果一般。

![在vscode中使用终端的效果](/public/vscode.png)

![在浏览器中查看的效果](/public/web.png)

### 答题使用

5. `src/main.ts`中，作答者可以通过`answerQuestion`函数来作答，参数`question`是题目名称，（受到类型支持），参数`answer`会根据你选择的题目来提示你需要作答的函数类型，若添加了测试函数但是暂时不想对它进行测试，可以再在配置里设置`skip`参数为`true`可以跳过测试，不添加此属性时默认为`false`。
6. 若设置的题目预期答案类型比较复杂想要类型支持，可以通过`GetAnswerType<>`工具进行强制类型以获得类型提示支持，例如：

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

对于**出题人员**，可在`lib/types/questiones.ts`中设置
- 题目列表，包括题目名称、作答函数类型
- 导出自定义的类型供作答者使用

出题人员可在`lib/questiones.ts`，可在此处设置测试函数，
测试函数会自动打印测试开始与结束标志，
`testQuestionName`属性可从你在`lib/types/questiones.ts`中设置的题目列表中
获得类型支持以方便出题者快速选择

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

## 题目

### A-B问题

**难度：**`入门`

**要求：** 实现一个函数，接受两个数字输入，返回第一个参数减去第二个参数的值。

### URL解析

**难度：**`简单`

对给定URL串进行解析，解析内容包括：
- 参数集合
- 当前相对路径

> 可以使用`GetAnswerType<'URL parse'>`来获得返回值类型支持

### 斐波那契数列求解

**难度：**`中等`

这是个老题目了，，
这次我们要实现对第n个斐波那契数字`fibonacci(n)`的求解，
但是要求使用递归的方法，不过这次的递归方法并不是一般的解法...

数据范围：`n<=38`
时间范围：`50ms`


### 柯里化

**难度：**`中等`

**要求：** 返回给定函数的柯里化形式
