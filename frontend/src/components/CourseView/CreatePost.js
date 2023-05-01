import {useState} from "react";

const CreatePost=({course})=>{
    const [text,setText]=useState('')
    const submit =(e)=>{
        e.preventDefault()
        //TODO POST TO COURSE
    }

    return <form onSubmit={submit}><input onChange={e=>setText(e.target.value)}
                        value={text}
                        type="text"/></form>
}
