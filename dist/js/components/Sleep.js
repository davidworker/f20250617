class Sleep {
    static run(ms) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve()
            }, ms)
        })
    }
}

export { Sleep }
