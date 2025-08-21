let student = {
    name: 'David',
    age: 20,
    score: 70,
}

let student2 = {
    name: 'John',
    age: 21,
    score: 80,
}

// 100 個學生時，使用物件會很麻煩

// 將學生分數統一加 5 分

// hard code 寫法
student.score += 5 // student.score = student.score + 5
student2.score += 5 // student2.score = student2.score + 5
// 98 個學生要加 5 分，要加 98 次

// let students = [student, student2]
let students = []
students.push(student)
students.push(student2)
students.push({ name: 'Mary', age: 22, score: 60 })

students.forEach(function (student, index) {
    // call by reference
    // student.score += 5

    // 不使用 call by reference 的方式，使用 index 來操作陣列
    students[index].score += 5
    // students[0].score = students[0].score + 5
    // students[1].score = students[1].score + 5
    // students[2].score = students[2].score + 5
})

console.log(students)

// 物件是 call by reference
let a = { name: 'A' }
let b = a
b.name = 'B'

console.log('a', a)
console.log('b', b)
