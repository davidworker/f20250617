class Storage {
    constructor(key) {
        this.key = key
    }

    write(value) {
        if (typeof value === 'object' || typeof value === 'array') {
            value = JSON.stringify(value)
        }
        localStorage.setItem(this.key, value)
    }

    read() {
        let value = localStorage.getItem(this.key)
        try {
            // 因為不知道會發生什麼錯誤，所以用 try catch
            return JSON.parse(value)
        } catch (error) {
            console.log(error)
            return value
        }
    }
}

export { Storage }
