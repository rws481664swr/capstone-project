import {useCallback, useState} from "react";

const useForm = (form) => {
    const [state, setState] = useState({...form})
    const onChange = useCallback(
        (e) => {
        const {target: {value, name}} = e
        setState(state => ({...state, [name]: value}))
    }, [setState])

    const clear = useCallback(
        () => setState(form),
        [setState]) // eslint-disable-line react-hooks/exhaustive-deps
    return [state, onChange, clear, setState]
}


export default useForm