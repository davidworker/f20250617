const sum = function (a, b) {
    // let a = a; // 函數幫你宣告的
    // let b = b; // 函數幫你宣告的
    a = a + 10 // 11
    b = b + 10 // 12
    return a + b
}

let a = 1
let b = 2

let result = sum(a, b)

console.log(result)

console.log(a, b)

const mul = function (num1, num2) {
    globalNum = 100 // 全域變數，不要使用（前面沒有 let、const、var）
    return num1 * num2
}

let resultMul = mul(1, 2)
// console.log(resultMul)
// console.log(num1, num2)
console.log(globalNum)
