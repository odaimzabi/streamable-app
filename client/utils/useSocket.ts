import { useToast } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { ContextType, useContext, useEffect, useState } from 'react'
import io,{} from 'socket.io-client'
import messagesContext from '../context/messages'
import { useAddUserMutation, useMeQuery, useRemoveUserMutation } from '../generated/graphql'



const useSocket=()=>{

    const socket=io("http://localhost:5000/message")
    const toast=useToast()
    const {id}=useRouter().query
    const [{fetching:fetching,data}]=useMeQuery({pause:typeof window=='undefined'})
    const [,addUser]=useAddUserMutation()
    const [,removeUser]=useRemoveUserMutation()
    const {messages,setMsg}= useContext(messagesContext) 


    const formatMessage=(msg:string)=>{
      
      setMsg([...messages,msg])
    }
    

    useEffect(()=>{
        socket.on('connect',async()=>{
           
            // console.log(data?.Me?.id)  
            if (data?.Me?.username){
            socket.emit('connected user',{user:data?.Me?.username,msg:`${data?.Me?.username} has joined the room`,room:id})

            }
            socket.on('disconnect',async(msg:any)=>{
        })
        
           socket.once('connected user',(msg:any)=>{
          
  
              toast({
                position:"top-right",
                title: "Info",
                description: `${msg}`,
                status: "success",
                duration: 4000,
                isClosable: true,
              })

                
    
            })

         
          


            socket.on('disconnected user',(msg:any)=>{
              toast({
                  title: "Info",
                  description: `${msg}`,
                  status: "warning",
                  duration: 4000,
                  isClosable: true,
                  position:"top-right"
              })
          })
            
          })  

         
          
   
             
       
  
   
      },[data])
    


}

export default useSocket