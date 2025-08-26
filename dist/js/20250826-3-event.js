const dom = {
    btn: document.querySelector('#btn'),
    btn2: document.querySelector('#btn2'),
}

dom.btn.addEventListener('click', function (e) {
    console.log('btn click with function')
    console.log(e)
})

const onBtnClick = function (e) {
    console.log('btn click with onBtnClick')
    console.log(e)
}

dom.btn.addEventListener('click', onBtnClick)
// 相等於上面
// dom.btn.addEventListener('click', function (e) {
//     onBtnClick(e)
// })

dom.btn2.addEventListener('click', function (e) {
    // 移除事件監聽，僅限於具名函數綁定
    dom.btn.removeEventListener('click', onBtnClick)
})
