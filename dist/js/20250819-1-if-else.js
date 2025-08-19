// let condition = false // true

let operator = 'add'

let condition = operator === 'add'

// 過濾多數

/**
 * boolean false:
 * - false
 * - 0
 * - null
 * - undefined
 * - NaN
 * - ''
 */

if (0) {
    console.log('0 is true')
} else {
    console.log('0 is false')
}

if ('a') {
    console.log('a is true')
} else {
    console.log('a is false')
}

let num1 = 10
let num2 = '10'

if (num1 === num2) {
    console.log('num1 === num2')
} else {
    console.log('num1 !== num2')
}

if (num1 == num2) {
    console.log('num1 == num2')
} else {
    console.log('num1 != num2')
}

if (condition) {
    console.log('condition is true')
} else {
    console.log('condition is false')
}

// 巢狀 if else if 可讀性較差
if (operator === 'add') {
    console.log('run add.')
    let result = num1 + num2
    dom.result.textContent = result
} else if (operator === 'sub') {
    console.log('run sub.')
    let result = num1 - num2
    dom.result.textContent = result
} else if (operator === 'mul') {
    console.log('run mul.')
    let result = num1 * num2
    dom.result.textContent = result
} else if (operator === 'div') {
    console.log('run div')
    if (num2 === 0) {
        alert('除數不能為 0')
        return false
    }
    let result = num1 / num2
    dom.result.textContent = result
}

// 巢狀 if else (波動拳) 不建議使用，可讀性差
if (operator === 'add') {
} else {
    if (operator === 'sub') {
    } else {
        if (operator === 'mul') {
        } else {
            if (operator === 'div') {
            }
        }
    }
}
