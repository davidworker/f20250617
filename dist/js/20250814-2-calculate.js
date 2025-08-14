let dom = {
    num1: document.querySelector('#num1'),
    num2: document.querySelector('#num2'),
    operator: document.querySelector('#operator'),
    btnCalculate: document.querySelector('#btn-calculate'),
    result: document.querySelector('#result'),
}

// 檢查 dom 是否存在
console.log(dom)

dom.btnCalculate.addEventListener('click', function () {
    // 測試事件是否正常觸發
    console.log('click btn')

    let num1 = dom.num1.value
    let num2 = dom.num2.value
    let operator = dom.operator.value

    // 檢查是否有輸入數字與計算方式 (布林值)
    if (!num1 || !num2 || !operator) {
        alert('請輸入數字與計算方式')
        // 看到 return 表示程式結束
        return false
    }

    // 從 DOM 中取得的數值，一定都是字串
    num1 = parseInt(num1, 10)
    num2 = +num2

    if (operator === 'add') {
        console.log('run add.')
        let result = num1 + num2
        dom.result.textContent = result
    }

    if (operator === 'sub') {
        console.log('run sub.')
        let result = num1 - num2
        dom.result.textContent = result
    }

    // 乘法

    // 除法
})

// == 相等，只要外觀長得一樣就可以
// === 嚴格相等，外觀長得一樣，而且資料型態也要一樣

let a = 1
let b = '1'

if (a == b) {
    console.log('a == b')
}

if (a === b) {
    console.log('a === b')
}
