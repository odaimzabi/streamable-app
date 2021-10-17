
import {createContext,useState} from 'react'


interface ContextValue{
    messages:string[]
    setMsg:React.Dispatch<React.SetStateAction<string[]>>
}

const initialState:ContextValue={
    messages:[],
    setMsg:(data)=>{}
}

const messagesContext=createContext<ContextValue>(initialState)

export default messagesContext