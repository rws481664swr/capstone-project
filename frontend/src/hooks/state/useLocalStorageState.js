import {useEffect, useState} from "react";

const useLocalStorageState = (prop, init) => {
    const [state,setState] = useState(() => {
        const item=window.localStorage.getItem(prop)

        if (item!=="undefined") {
            return JSON.parse(window.localStorage.getItem(prop))
        }
        console.log('setItem as ',init)
        return init
    })
    useEffect(()=> {
            window.localStorage
                .setItem(prop, JSON.stringify(state))
        },
        [prop,state])
    return [state,setState]
}

export default useLocalStorageState