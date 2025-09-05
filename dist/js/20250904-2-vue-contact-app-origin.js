// 原生做法

const dom = {
    name: document.querySelector('#name'),
    email: document.querySelector('#email'),
    phone: document.querySelector('#phone'),
    subject: document.querySelector('#subject'),
    message: document.querySelector('#message'),
    submit: document.querySelector('#submit'),
}

dom.submit.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(dom.name.value, dom.email.value, dom.phone.value, dom.subject.value, dom.message.value)
    // 發送資料到後端
})
