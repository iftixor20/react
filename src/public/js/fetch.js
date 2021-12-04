async function request(path, method, body){
    const response = await fetch(path, {
        method,
        headers: {
            'Content-Type': 'apllication/json'
        },
        body: JSON.stringify(body)
    })
    const parseData = await response.json()
    return parseData
}