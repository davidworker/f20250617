import { Alert } from './components/Alert.js'
import { Sleep } from './components/Sleep.js'
import { Ajax } from './components/Ajax.js'

const API_URL = 'https://book.niceinfos.com/api/form/io.php'

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
        }
    },
    methods: {
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
                // 將 uid 存到 localStorage
            } else {
                await Alert.error('發送失敗', response.message)
            }
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
    },
    mounted() {
        console.log('mounted')
    },
}

const { createApp } = Vue

// 初始化 Vue App
createApp(options).mount('#app')
