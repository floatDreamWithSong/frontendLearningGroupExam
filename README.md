# 博远信息技术社前端学习小组测验

## 使用

1. 将仓库克隆到本地
2. 终端打开项目目录，使用命令`pnpm i`下载依赖项。
3. 打开`.env.test`，修改`VITE_USER_NAME`为自己的姓名
4. 终端输入`pnpm test`，开启测试
5. `src/main.spec.ts`中，可以在`selectedQuestions`中选择需要测试的题目(选择时会受到类型支持以方便作答者快速选择)，若传入参数为`[]`，则默认测试所有你使用了`answerQuestion`标记的题目
6. `src/main.ts`中，作答者可以通过`answerQuestion`函数来作答，第一个参数是题目名称，（受到类型支持），第二个参数会根据你选择的题目来提示作答函数类型
7. 若设置的题目预期答案类型比较复杂想要类型支持，可以通过`GetAnswerType<>`工具进行强制类型以获得类型提示支持，例如：

```ts
answerQuestion('URL parse', (url: string) => {
  const exp_ans = {
    location: 'localhost:80',
    paraments: {
      a: 1,
      b: 'stri'
    }
  } as GetAnswerType<'URL parse'>
  return exp_ans
})
```

对于**出题人员**，可在`lib/types/questiones.ts`中设置
- 题目列表，包括题目名称、作答函数类型
- 导出自定义的类型供作答者使用

可在`lib/questiones.ts`，可在此处设置测试函数，
测试函数会自动打印测试开始与结束标志，
`testQuestionName`属性可从你在`lib/types/questiones.ts`中设置的题目列表中
获得类型支持以方便出题者快速选择

```ts
setQuestion({
    testQuestionName: 'A minus B',
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

**要求：**实现一个函数，接受两个数字输入，返回第一个参数减去第二个参数的值。

### URL解析

**难度：**`简单`

对给定URL串进行解析，解析内容包括：
- 参数集合
- 当前相对路径

### 节流

**难度：**`简单`

节流，即对于同样的操作，在一定范围内返回相同的计算结果

### 防抖

**难度：**`简单`

### 柯里化

**难度：**`中等`

**要求：**返回给定函数的柯里化形式

### Promise封装应用

### 数据验证

### WebWork

### 算法题
