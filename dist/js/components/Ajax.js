class Ajax {
    static async get(url, params = {}) {
        let queryString = Object.keys(params)
            .map((key) => `${key}=${params[key]}`)
            .join('&')

        let response = await fetch(`${url}?${queryString}`)
        try {
            let data = await response.json()
            return data
        } catch (error) {
            let text = await response.text()
            return text
        }
    }

    static async post(url, data = {}) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        let response = await fetch(url, options)
        try {
            let data = await response.json()
            return data
        } catch (error) {
            let text = await response.text()
            return text
        }
    }
}

export { Ajax }
