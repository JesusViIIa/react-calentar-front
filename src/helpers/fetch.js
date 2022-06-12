export const fetchTokenLess = (path, data, method = 'GET') => {
    const base = process.env.REACT_APP_API_URL
    const url = `${base}/${path}`

    try {
        if (method === 'GET') {
            return fetch(url)
        } else {
            return fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)

            })
        }


    } catch (error) {
        console.log(error);
    }

}

export const fetchToken = (path, data, method = 'GET') => {
    const base = process.env.REACT_APP_API_URL
    const url = `${base}/${path}`
    const token = localStorage.getItem('token') || ''

    try {
        if (method === 'GET') {
            return fetch(url, {
                method,
                headers: {
                    'x-token': token
                }
            })
        } else {
            return fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token
                },
                body: JSON.stringify(data)

            })
        }


    } catch (error) {
        console.log(error);
    }

}