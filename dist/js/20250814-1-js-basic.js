let student = {
    name: 'David Lin', // 屬性 key: value
    age: 18,
    gender: 'male',
    sayHello: function () {
        // 方法
        console.log('Hello, I am ' + this.name)
    },
}

console.log(student)

// 變數 = 物件中的屬性
let name = 'David Lin'

// 函數 = 物件中的方法
function sayHello() {
    console.log('Hello')
}

// . 存取物件中的屬性或方法
console.log(student.name)
student.sayHello()
