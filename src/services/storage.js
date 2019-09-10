
export const _retrieveData = (nome) => {
    try{
        return JSON.parse(localStorage('@emporio/' + nome));
    } catch(error){
        console.log('error')
    }
}

export const _storeData = (local, data) => {
    try{
        localStorage.setItem('@emporio/'+local, data)
    } catch(error){
        console.log('error')
    }
}



export const setToken = (token) => {
    try {
        localStorage.setItem('@emporio/token', token)
    } catch (error) {
        console.log('error')
    }
}

export const setUser = (user) => {
    try {
        localStorage.setItem('@emporio/user', user)
    } catch (error) {
        console.log('error')
    }
}

export const getToken = () => {
    try {
        return localStorage.getItem('@emporio/token')
    } catch (error) {
        console.log('error')
    }
}

export const getUser = () => {
    try {
        return localStorage.getItem('@emporio/user')
    } catch (error) {
        console.log('error')
    }
}