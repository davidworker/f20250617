class Api {
    constructor(url) {
        this.url = url
    }

    async get(params = {}) {
        const url = new URL(this.url)
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value)
        })
        let response = await fetch(url)
        return await response.json()
    }

    async post(data = {}) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        if (data) {
            options.body = JSON.stringify(data)
        }
        let response = await fetch(this.url, options)
        return await response.json()
    }
}

export { Api }
