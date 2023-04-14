export function createConfigToken(token) {
    return {
        headers: {authorization: `Bearer ${token}`}
    }
}


