const dom = {
    name: document.querySelector('#name'),
    chinese: document.querySelector('#chinese'),
    english: document.querySelector('#english'),
    math: document.querySelector('#math'),
    btn: document.querySelector('#btn'),
    table: document.querySelector('#table'),
}

let students = []

const addScore = function () {
    let name = dom.name.value
    let chinese = dom.chinese.value
    let english = dom.english.value
    let math = dom.math.value

    if (!name || !chinese || !english || !math) {
        return
    }

    let total = +chinese + +english + +math

    console.log(name, chinese, english, math, total)
    let tr = `<tr>
        <td>${name}</td>
        <td>${chinese}</td>
        <td>${english}</td>
        <td>${math}</td>
        <td>${total}</td>
    </tr>`

    dom.table.querySelector('tbody').insertAdjacentHTML('beforeend', tr)

    students.push({
        name,
        chinese,
        english,
        math,
        total,
    })

    // JSON.stringify 將物件轉換成字串
    localStorage.setItem('students', JSON.stringify(students))
}

const checkScore = function (score) {
    if (score < 0) {
        return 0
    }

    if (score > 100) {
        return 100
    }

    return score
}

dom.btn.addEventListener('click', addScore)
dom.chinese.addEventListener('keyup', function (e) {
    let value = dom.chinese.value
    dom.chinese.value = checkScore(value)
    if (e.key == 'Enter') {
        addScore()
    }
})
dom.english.addEventListener('keyup', function (e) {
    let value = dom.english.value
    dom.english.value = checkScore(value)
    if (e.key == 'Enter') {
        addScore()
    }
})
dom.math.addEventListener('keyup', function (e) {
    let value = dom.math.value
    dom.math.value = checkScore(value)
    if (e.key == 'Enter') {
        addScore()
    }
})

dom.name.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        addScore()
    }
})

const init = function () {
    let jsonStr = localStorage.getItem('students')
    // JSON.parse 將字串轉換成物件
    students = jsonStr ? JSON.parse(jsonStr) : []

    students.forEach((student) => {
        let tr = `<tr>
            <td>${student.name}</td>
            <td>${student.chinese}</td>
            <td>${student.english}</td>
            <td>${student.math}</td>
            <td>${student.total}</td>
        </tr>`

        dom.table.querySelector('tbody').insertAdjacentHTML('beforeend', tr)
    })
}

init()
