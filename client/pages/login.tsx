import { Button, Flex, Input } from '@chakra-ui/core'
import React, { useState } from 'react'
import { useLoginMutation } from '../generated/graphql'
import {createUrqlClient} from '../utils/createWithUrql'
import {withUrqlClient} from 'next-urql'
import {useRouter} from 'next/router'
import { useToast } from '@chakra-ui/core'
import Layout from '../components/Layout'
interface Props {
    
}


const login = (props: Props) => {

   const [username,setUsername]=useState(null)
    const [password,setPassword]=useState(null)
    const [{fetching:fetching},login]=useLoginMutation()
    const toast=useToast()
    const router=useRouter()
    const handleSubmit= async(e:any)=>{
        e.preventDefault()
        const res=await login({username:username,password:password} as any)
        console.log(res)
        if (!res.data?.Login){
            toast(
            { title: "An error occurred.",
            description: "Incorrect password or username",
            status: "error",
            duration: 9000,
            isClosable: true,
            position:"top-right"}
            )
        }else{
            if (router.query.next){
                router.push(`${router.query.next}`)
            }else{
             router.push('/')
            }
        }
    }
    return (
        <Layout title="Login">
        <Flex position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)">
            <Flex flexDirection="column">
            <form onSubmit={handleSubmit}>
            <Input placeholder="Username" mt="1rem" onChange={(e:any)=>setUsername(e.target.value)}/>
            <Input placeholder="Password" mt="1rem" onChange={(e:any)=>setPassword(e.target.value)}/>
            <Button mt="1rem" variantColor="blue" type="submit" isLoading={fetching}>Login</Button>
            </form>
            </Flex>
        </Flex>
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient,{ssr:false})(login)
