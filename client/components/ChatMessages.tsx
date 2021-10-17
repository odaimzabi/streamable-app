import {Flex,Box,Input,Button,List, ListItem, Divider,PseudoBox} from "@chakra-ui/core"
import React, { useContext, useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const ChatMessages=({id}:any)=>{

    const socket=io("http://localhost:5000/message")
    const value=useRef<HTMLInputElement>(null)
    const [messages,setMsg]=useState([])

    useEffect(()=>{

        socket.on('message',(msg:never)=>{
            
            setMsg([...messages,msg])
        })
    
      },[messages])


    return(

        <>
        
     <Input placeholder="Message" position="relative" left="5%" borderWidth="3px" isFullWidth size="lg" px={"40px"} ref={value} mt={"21rem"} ml={"2rem"} onKeyDown={(e:any)=>{
       
        if (e.key=="Enter"){
    
         const msg=value.current?.value;
            
            socket.emit('message',{msg:msg,room:id})
            console.log(messages)
            setMsg([...messages,msg ] as any)
        }  
    
    }}
    />
    
    
    <Flex alignItems="center" justifyContent="center" position="absolute" left="90%">
      
    <Box borderWidth="3px" rounded="md" maxWidth="100%" boxSizing="border-box" w="400px" h="300px" mr="10rem" overflowY="auto" position="relative" right="15%">
     
        <PseudoBox
          
          px={4}
          py={2}
          borderTopWidth="1px"
          _first={{ borderTopWidth: 0 }}
          
        >
            { messages.map((item:any)=>{
            return(
            <>
            {item}
            <Divider/>
            </>
            )
          })}
      
        </PseudoBox>
      
    </Box>
    
      
    
        </Flex>  
        </>
    )
         

}


export default ChatMessages