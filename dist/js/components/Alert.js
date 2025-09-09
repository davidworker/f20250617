class Alert {
    static init() {
        return new Promise((resolve, reject) => {
            if (typeof window.Swal === 'undefined') {
                let script = document.createElement('script')
                script.src = 'js/lib/sweetalert2@11.js'
                script.onload = () => {
                    console.log('Swal loaded')
                    resolve()
                }
                document.head.appendChild(script)
            } else {
                resolve()
            }
        })
    }

    static async success(title, html, okBtnText = '確定') {
        await this.init()
        let result = await Swal.fire({
            title,
            html,
            icon: 'success',
            confirmButtonText: okBtnText,
        })
        return result
    }

    static async error(title, html, okBtnText = '確定') {
        await this.init()
        let result = await Swal.fire({
            title,
            html,
            icon: 'error',
            confirmButtonText: okBtnText,
        })
        return result
    }

    static async confirm(title, html, confirmBtnText = '確定', cancelBtnText = '取消') {
        await this.init()
        let result = await Swal.fire({
            title,
            html,
            icon: 'question',
            confirmButtonText: confirmBtnText,
            cancelButtonText: cancelBtnText,
            showCancelButton: true,
            confirmButtonColor: '#ff4747',
        })
        return result
    }
}

export { Alert }
