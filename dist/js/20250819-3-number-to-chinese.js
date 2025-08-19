let dom = {
    number: document.querySelector('#number'),
    calculate: document.querySelector('#calculate'),
    result: document.querySelector('#result'),
}

// 檢查 dom 是否存在
console.log(dom)

dom.calculate.addEventListener('click', function () {
    // 檢查是否正常觸發
    console.log('click calculate')

    // 清空結果
    dom.result.classList.remove('show')

    // 取得數字
    let number = dom.number.value

    if (!number) {
        alert('請輸入數字')
        return
    }

    // 宣告陣列
    let chinese = []
    // 將字串每一個字元轉換為陣列
    let chars = number.split('')
    // 遍歷陣列
    for (let i = 0; i < chars.length; i++) {
        // chinese.push(numberToChinese(chars[i]))
        chinese.push(numberToChineseHashMap(chars[i]))
    }

    // 將陣列轉換為字串
    let chineseStr = chinese.join('')
    setResult(chineseStr)
})

/**
 * 設定結果
 * @param {*} score 分數
 * @param {*} level 等級
 */
const setResult = function (chinese) {
    dom.result.classList.add('show')
    dom.result.textContent = chinese
}

/**
 * 阿拉伯數字轉換中文
 * @param {*} number 阿拉伯數字
 * @returns 中文
 */
const numberToChinese = function (number) {
    // 轉換為數字，因為 switch case 判斷數字型態
    number = parseInt(number, 10)
    // number = +number

    let chinese = ''
    switch (number) {
        case 0:
            chinese = '零'
            console.log(0)
            break
        case 1:
            console.log(1)
            chinese = '壹'
            break
        case 2:
            chinese = '貳'
            break
        case 3:
            chinese = '參'
            break
        case 4:
            chinese = '肆'
            break
        case 5:
            chinese = '伍'
            break
        case 6:
            chinese = '陸'
            break
        case 7:
            chinese = '柒'
            break
        case 8:
            chinese = '捌'
            break
        case 9:
            chinese = '玖'
            break
        default:
            chinese = '無效的數字'
            break
    }
    return chinese
}

/**
 * 阿拉伯數字轉換中文 (HashMap)
 */
const chineseMap = {
    0: '零',
    1: '壹',
    2: '貳',
    3: '參',
    4: '肆',
    5: '伍',
    6: '陸',
    7: '柒',
    8: '捌',
    9: '玖',
}

/**
 * 阿拉伯數字轉換中文 (HashMap) 取代 switch case，效能較好
 * @param {*} number 阿拉伯數字
 * @returns 中文
 */
const numberToChineseHashMap = function (number) {
    // 不需要轉換型態也可比對
    // number = +number
    console.log(number, typeof number)
    console.log(number, 'in numberToChineseHashMap')
    return chineseMap[number] ? chineseMap[number] : '無效的數字'
}

// switch case 可以做的，if else 也可以做
// 但是 if else 可以做的，switch case 不一定可以做
