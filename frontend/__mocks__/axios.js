import {BASE_URL} from "../src/config";

axios.get.mockImplementation((url) => {
    let result = url.slice(BASE_URL.length);
    if(result[result.length-1] === '/') result = result.slice(0, result.length-1);
    switch (result){
        case '/courses':
            return Promise.resolve({data: coursesList})
        case '/users':
            return Promise.resolve({data:usersList})
        case '/auth/token':
            return Promise.resolve({data:'token'})
    }
    return Promise.resolve({data: []})

})
const axios = {
    get: jest.fn().mockResolvedValue({
        data: {}
    }),
    post: jest.fn().mockResolvedValue({
        data: {}
    }),
    put: jest.fn().mockResolvedValue({
        data: {}
    }),
    delete: jest.fn().mockResolvedValue({
        data: {}
    })
}
export default axios