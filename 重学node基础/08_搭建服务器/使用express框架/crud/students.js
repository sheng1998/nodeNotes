/** 
 * students.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 */

//  引入文件操作的包 fs
let fs = require('fs');
let path = './db.json'

/**
 * 获取所有学生列表
 */
exports.find = function (callback) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            return callback(err)
        } else {
            callback(null, JSON.parse(data).students)
        }
    })
}

/**
 * 根据 id 获取学生信息
 */
exports.findById = function (id, callback) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            return callback(err)
        } else {
            let students = JSON.parse(data).students
            let student = students.find(item => {
                return item.id === id
            })
            callback(null, student)
        }
    })
}

/**
 * 添加保存学生
 */
exports.save = function (student, callback) {
    let now = new Date()
    let year = now.getFullYear().toString()
    let month = (now.getMonth() + 1).toString()
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            return callback(err)
        } else {
            data = JSON.parse(data)
            let totalStudent = Number(data.totalStudent)
            let id = (totalStudent + 1).toString().padStart('6', '0')
            id = id = year + month + id
            student.id = id
            data.students.push(student)
            data.totalStudent += 1
            writeDB(data, callback)
        }
    })
}

/**
 * 更新学生信息
 */
exports.undateById = function (student, callback) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            return callback(err)
        } else {
            data = JSON.parse(data)
            let students = data.students
            let index = students.findIndex(item => {
                return student.id === item.id
            })
            students[index] = student
            writeDB(data, callback)
        }
    })
}

/**
 * 删除学生
 */
exports.deleteById = function(id, callback) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            return callback(err)
        } else {
            data = JSON.parse(data)
            let students = data.students
            let index = students.findIndex(item => {
                return item.id === id
            })
            students.splice(index, 1)
            writeDB(data, callback)
        }
    })
}

// 写入文件
function writeDB(data, callback) {
    let fileData = JSON.stringify(data)
    fs.writeFile(path, fileData, err => {
        if (err) {
            return callback(err)
        } else {
            callback()
        }
    })
}
