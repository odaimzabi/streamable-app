import Layout from '../../components/Layout'
import io from 'socket.io-client'
import {Flex,Box,Input,Button,List, ListItem, Divider,Text} from "@chakra-ui/core"
import {PseudoBox} from "@chakra-ui/core"
import React, { useContext, useEffect, useRef, useState,createRef} from 'react'
import YouTube from 'react-youtube';
import {withUrqlClient} from 'next-urql'
import {createUrqlClient} from '../../utils/createWithUrql'
import { useRouter } from 'next/router'
import useSocket from '../../utils/useSocket'
import { useFindRoomQuery, useMeQuery } from '../../generated/graphql'

import useAuth from '../../utils/useAuth'

const ChatRoom = () =>{

  useAuth()

  const socket=io("http://localhost:5000/message")

  const [color,setColor]=useState('#'+Math.floor(Math.random()*16777215).toString(16))
  const [messages,setMsg]=useState([])
  const [videoState,setVideoState]=useState("")
  const [videoId,setVideoId]=useState("")

  const value=useRef<HTMLInputElement>(null)
  const [Me]=useMeQuery({pause:typeof window=='undefined'})
  
  const player=useRef(null) as any
  useSocket()

  
  const router=useRouter()
  const {id} =router.query
  const parsedId=parseInt(id as string)
  const [FindRoom]=useFindRoomQuery({variables:{id:parsedId} as any})

  
  useEffect(()=>{
    socket.on('connect',()=>{
    socket.on('message',(msg:any)=>{
      if (msg.room==id){
      setMsg([...messages,msg.msg] as never)
      
      }
    })

    socket.on('videoEvent',(msg:any)=>{
        setVideoState(msg)
          const p=player.current.getInternalPlayer()
        switch(msg){

          case "PAUSE":
           p.pauseVideo()
           
           break
          case "PLAY":
            p.playVideo()
            break


          default:
            break
        }
    })
  
  })

  return ()=>{
    socket.off('message')
  }
  },[messages])

  useEffect(()=>{
    socket.on('connect',()=>{
      socket.on('videoEvent',(msg:any)=>{
          setVideoState(msg)
      })

    })
  },[videoState])

  useEffect(()=>{
      if (FindRoom.data?.FindRoom?.youtubeLink){
          setVideoId(FindRoom.data?.FindRoom?.youtubeLink)
      }
  },[FindRoom])

  
  function changeVideoState(e:any){

    const {data}=e;

    switch(data){

      case -1:
        
        break
      case 1:
       
        socket.emit("videoEvent",{msg:"PLAY",room:id})
        e.target.playVideo()
        break
      case 2:
        socket.emit("videoEvent",{msg:"PAUSE",room:id})
        e.target.pauseVideo()
        break

      default:
        return
    }
    
  }

    const opts= {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    } as const;

  return(
    <Layout title="Home Page">
  
    <Box h="100%">
    <Flex top="35%" left="40%" direction="column" justifyContent="center" alignItems="center" position="absolute" transform="translate(-50%,-50%)">


    

    <Box px={24} >
      <Flex mt={120} >
    
      <Box mr={3}>
     <YouTube videoId={videoId} 
      opts={opts}  
      onStateChange={changeVideoState}
      ref={player}
      />

     </Box>
     
       
     <Input placeholder="Message" position="relative" left="5%" borderWidth="3px" isFullWidth size="lg" px={"40px"} ref={value} mt={"21rem"} ml={"2rem"} onKeyDown={(e:any)=>{
       
       if (e.key=="Enter"){
        
        let msg
        if (value!.current!.value){
         msg=`${Me.data?.Me?.username}:${value.current?.value}`;
         e.target.value=""
         socket.emit('message',{msg:msg,room:id})
         console.log(messages)
         console.log(msg.split(":"))
         setMsg([...messages,msg ] as any)
        }
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
             const user=item.split(":")[0]
             const msg=item.split(":")[1]
           return(
           <>
           <Flex flexDir="row">
           <Text color={color}>{user}</Text>
           <Text>:{msg}</Text>
           </Flex>
           <Divider/>
           </>
           )
         })}
     
       </PseudoBox>
     
   </Box>
   
     
   
       </Flex>  
    
    </Flex>

    </Box>
    </Flex>

    </Box>
   
    </Layout>
)
  }

export default withUrqlClient(createUrqlClient,{ssr:false})(ChatRoom)
