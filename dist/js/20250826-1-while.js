/**
 * 產生乘法表
 * @param {*} a
 * @param {*} b
 * @returns
 */
const mulTable = function (a, b) {
    const max = 5 // 最大值
    const ignore = 3 // 忽略的數字
    let nums = {
        thead: [],
        tbody: [],
    }
    let thead = ['']

    let j = 1
    while (j <= b) {
        if (j === ignore) {
            j++
            continue // 跳過本次迴圈，繼續下一次迴圈
        }
        console.log(j)
        thead.push(j)
        j++ // 遞增，如果沒有會無限迴圈
        if (j > max) {
            break // 跳出迴圈
        }
    }

    // for (let j = 1; j <= b; j++) {
    //     thead.push(j)
    // }
    nums.thead = thead

    let i = 1
    while (i <= a) {
        let tr = [i]

        let j = 1
        while (j <= b) {
            if (j === ignore) {
                j++
                continue // 跳過本次迴圈，繼續下一次迴圈
            }
            console.log(j, i * j)
            tr.push(i * j)
            j++ // 遞增，如果沒有會無限迴圈
            if (j > max) {
                break // 跳出迴圈
            }
        }
        nums.tbody.push(tr)
        i++ // 遞增，如果沒有會無限迴圈
    }

    // for (let i = 1; i <= a; i++) {
    //     let tr = [i]
    //     for (let j = 1; j <= b; j++) {
    //         tr.push(i * j)
    //     }
    //     nums.tbody.push(tr)
    // }

    return nums
}

/**
 * 產生乘法表的表格
 * @param {*} nums
 */
const generateTable = function (nums) {
    let thead = '<tr>'
    nums.thead.forEach((item, index) => {
        thead += `<th>${item}</th>`
    })
    thead += '</tr>'

    let tbody = ''
    nums.tbody.forEach((item, index) => {
        tbody += `<tr>`
        item.forEach((item, index) => {
            tbody += `<td>${item}</td>`
        })
        tbody += '</tr>'
    })

    dom.mulTable.querySelector('thead').innerHTML = thead
    dom.mulTable.querySelector('tbody').innerHTML = tbody
}

let dom = {
    num1: document.querySelector('#num1'),
    num2: document.querySelector('#num2'),
    generateBtn: document.querySelector('#generate-btn'),
    mulTable: document.querySelector('#mul-table'),
}

console.log(dom)

dom.generateBtn.addEventListener('click', () => {
    let num1 = dom.num1.value
    let num2 = dom.num2.value
    if (!num1 || !num2 || num1 < 1 || num2 < 1) {
        Swal.fire({
            title: '產生錯誤',
            html: '請輸入數字',
            icon: 'warning',
            confirmButtonText: '確定',
        })
        return
    }
    let nums = mulTable(num1, num2)
    generateTable(nums)
})
