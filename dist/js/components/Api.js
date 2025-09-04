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

    async create(data = {}) {
        return await this.post({ data })
    }

    async delete(uid) {
        return await this.post({ uid, action: 'delete' })
    }

    async update(uid, data = {}) {
        return await this.post({ uid, data })
    }
}

export { Api }
