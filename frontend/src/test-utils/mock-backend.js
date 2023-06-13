import {BASE_URL} from "../config";

export const extractKeysAsList= (obj)=>
    Object.keys(obj).map(key=>obj[key])
        .reduce((acc, val)=>[...acc,val],[])
export const MOCK_TOKEN = {current: 'TOKEN'}

export const spliceUrl = (url) => {
    const arr = BASE_URL.split('')
    const toReturn = url.split('')
    while (arr.length){
        arr.shift()
        toReturn.shift()
    }
    return toReturn.join('')

}