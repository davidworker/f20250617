import { Alert } from './components/Alert.js'
import { Sleep } from './components/Sleep.js'
import { Ajax } from './components/Ajax.js'
import { Storage } from './components/Storage.js'

const API_URL = 'https://book.niceinfos.com/api/form/io.php'

// 儲存資料到 localStorage
const storage = new Storage('contact')

// 測試開始
// storage.write('1234')
// storage.write({
//     name: 'John',
//     email: 'john@example.com',
//     phone: '1234567890',
//     subject: 'Hello',
//     message: 'Hello, world!',
// })
// storage.write([1, 2, 3, 4])
// read 會引發錯誤
// storage.write('')
// let data = storage.read()
// console.log(data)
// 測試結束

const options = {
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            },
            requires: {
                name: '姓名',
                email: '信箱',
                phone: '電話',
                subject: '主旨',
                message: '訊息',
            },
            currentTab: 'input',
            items: {},
            editUid: '',
        }
    },
    methods: {
        toTab(tab) {
            this.currentTab = tab
        },
        async submit() {
            // 檢查是否填寫完整
            for (let key in this.requires) {
                if (!this.form[key]) {
                    await Alert.error('欄位為填寫', `請輸入 ${this.requires[key]}`)
                    if (this.$refs[key]) {
                        // 原始用意，先睡覺再執行
                        await Sleep.run(400)
                        this.$refs[key].focus()
                    }
                    return
                }
            }

            if (this.form.phone.length !== 10) {
                await Alert.error('電話格式錯誤', '請輸入10位數字')
                if (this.$refs.phone) {
                    await Sleep.run(400)
                    this.$refs.phone.focus()
                }
                return
            }

            if (!this.emailValid(this.form.email)) {
                await Alert.error('信箱格式錯誤', '請輸入正確的 email 格式')
                if (this.$refs.email) {
                    await Sleep.run(400)
                    this.$refs.email.focus()
                }
                return
            }

            // 發送資料到後端
            console.log('submit')
            let response = await Ajax.post(API_URL, { data: this.form })
            if (response.code === 200) {
                await Alert.success('發送成功', '感謝您的留言')
                for (let key in this.form) {
                    this.form[key] = ''
                }
                let uid = response.uid
                let cloudData = await this.get(uid)
                this.items[uid] = cloudData
                storage.write(this.items)

                // // 讀取現有的列表資料
                // let storageData = storage.read()
                // // 如果現有的列表資料不存在，則初始化為空物件
                // if (!storageData || typeof storageData !== 'object') {
                //     storageData = {}
                // }
                // // 將雲端資料增加到現有的列表資料中
                // storageData[uid] = cloudData
                // // 儲存到 localStorage
                // storage.write(storageData)
            } else {
                await Alert.error('發送失敗', response.message)
            }
        },
        async get(uid) {
            let response = await Ajax.get(API_URL, { uid })
            return response.code == 200 ? response.data : {}
        },
        phoneValid(e) {
            let value = e.target.value
            if (value) {
                // 只保留數字，最多10位
                // ^ 開頭，$ 結尾，0-9 數字，g 全域，[] 字符集，^ 取反
                // slice(0, 10) 取前10位
                value = value.replace(/[^0-9]/g, '').slice(0, 10)
                this.form.phone = value
            }
        },
        emailValid(email = '') {
            if (!email) {
                return false
            }
            // email 正規表示法驗證
            // ^ 開頭，$ 結尾
            // [a-zA-Z0-9._%+-]+ 使用者名稱部分，允許英文、數字、點、底線、百分號、加號、減號，至少一個字符
            // @ 必須有 @ 符號
            // [a-zA-Z0-9.-]+ 網域名稱部分，允許英文、數字、點、減號，至少一個字符
            // \. 必須有點（轉義字符）
            // [a-zA-Z]{2,} 頂級網域，至少2個英文字母
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

            return emailRegex.test(email)
        },
        messageFormat(message = '') {
            if (message) {
                message = message.replace(/\n/g, '<br />')
            }
            return message
        },
        initItems() {
            let items = storage.read()
            if (!items || typeof items !== 'object') {
                items = {}
            }
            this.items = items
        },
        edit(uid) {
            this.editUid = uid
        },
        async save(uid) {
            let response = await Ajax.post(API_URL, { uid, data: this.items[uid] })
            if (response.code === 200) {
                await Alert.success('更新成功', '資料已更新到雲端')
                this.editUid = ''
                storage.write(this.items)
            } else {
                // 本地儲存等待網路更新
                await Alert.error('更新失敗', response.message)
            }
        },
        async remove(uid) {
            if (!uid || !this.items[uid]) {
                return
            }
            let item = this.items[uid]
            let result = await Alert.confirm('確定刪除嗎？', `刪除 ${item.name} 後將無法恢復`)
            if (!result.isConfirmed) {
                return
            }

            let response = await Ajax.post(API_URL, { uid, action: 'delete' })
            if (response.code === 200) {
                await Alert.success('刪除成功', '資料已刪除')
                delete this.items[uid]
                storage.write(this.items)
            } else {
                await Alert.error('刪除失敗', response.message)
            }
        },
    },
    mounted() {
        console.log('mounted')
        this.initItems()
    },
}

const { createApp } = Vue

// 初始化 Vue App
createApp(options).mount('#app')
