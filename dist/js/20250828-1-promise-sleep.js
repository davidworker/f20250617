const sleep = function (second = 3) {
    // reslove 成功
    // reject 失敗
    return new Promise(function (reslove, reject) {
        // setTimeout 秒數單位是毫秒 1000ms = 1s
        setTimeout(function () {
            if (second > 5) {
                reject(888)
            }
            // reslove 成功
            reslove(999)
        }, second * 1000)
    })
}

// sleep(3)
//     .then(function (data) {
//         console.log('sleep 3 秒後成功', data)
//         sleep(6)
//             .then(function (data) {
//                 console.log('sleep 6 秒後成功', data)
//             })
//             .catch(function (data) {
//                 console.log('sleep 6 秒後失敗', data)
//             })
//             .finally(function () {
//                 console.log('sleep 6 秒後完成')
//             })
//     })
//     .catch(function (data) {
//         console.log('sleep 3 秒後失敗', data)
//     })
//     .finally(function () {
//         console.log('sleep 3 秒後完成')
//     })

// IIFE 立即執行函數
;(async function () {
    const run = async () => {
        try {
            let result = await sleep(6)
            console.log('result', result)
        } catch (error) {
            // 當錯誤發生時，會跳到 catch 區塊
            console.log('error', error)
        } finally {
            // 無論成功或失敗，都會執行 finally 區塊
            console.log('finally')
        }
    }

    console.log('Start')
    run()
    console.log('End')
})()
