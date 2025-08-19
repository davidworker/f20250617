/**
 * 成功訊息
 * @param {*} title 標題
 * @param {*} html 內容
 * @returns promise
 */
const success = function (title, html) {
    let promise = Swal.fire({
        title: title,
        html: html,
        icon: 'success',
        confirmButtonText: '確認',
    })
    return promise
}

/**
 * 錯誤訊息
 * @param {*} title 標題
 * @param {*} html 內容
 */
const error = function (title, html) {
    let promise = Swal.fire({
        title: title,
        html: html,
        icon: 'error',
        confirmButtonText: '確認',
    })
    return promise
}

let dom = {
    score: document.querySelector('#score'),
    calculate: document.querySelector('#calculate'),
    result: document.querySelector('#result'),
}

// 檢查 dom 是否存在
console.log(dom)

/**
 * 設定結果
 * @param {*} score 分數
 * @param {*} level 等級
 */
const setResult = function (score, level) {
    let promise = success('計算完成', '查看結果')
    /**
     * 當 promise 被 resolve 時，會執行這個 function
     * 如同 addEventListener 的 callback function
     */
    promise.then(function (result) {
        dom.result.classList.add('show')
        let text = `<div>分數: ${score}</div>
                    <div>等級: ${level}</div>`
        // innerHTML 會解析 html 標籤(效能較差)
        dom.result.innerHTML = text
        // textContent 不會解析 html 標籤(效能較好)
        // dom.result.textContent = text
    })
}

/**
 * 綁定事件(非同步)
 * 如果我被點擊了(click)，我會執行你說的東西(callback function)
 */
dom.calculate.addEventListener('click', function () {
    // 檢查是否正常觸發
    console.log('click calculate')

    // 清空結果
    dom.result.classList.remove('show')

    // 取得分數
    let score = dom.score.value

    // 判斷分數是否介於 0 ~ 100
    // 小於 0 或 大於 100 都會顯示錯誤訊息
    if (!score || score < 0 || score > 100) {
        let promise = error('輸入錯誤', '請輸入 0 ~ 100 之間的分數')
        promise.then(function (result) {
            console.log(result)
        })
        return
    }

    if (score >= 90) {
        setResult(score, '甲')
        return
    }

    // >= 80
    if (score >= 80) {
        setResult(score, '乙')
        return
    }

    // >= 70
    if (score >= 70) {
        setResult(score, '丙')
        return
    }

    // >= 60
    if (score >= 60) {
        setResult(score, '丁')
        return
    }

    // < 60
    setResult(score, '不及格')
})

// 美食街排隊
// FIFO first in first out

// 點餐完成拿到呼叫器(非同步)
// 當餐點做完了，進行呼叫(callback function) -> 來拿餐點
