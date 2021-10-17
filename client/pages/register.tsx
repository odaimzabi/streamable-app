import { Button, Flex, Input } from '@chakra-ui/core'
import React from 'react'
import Layout from '../components/Layout'
import { createUrqlClient } from '../utils/createWithUrql'
import {withUrqlClient} from 'next-urql'
interface Props {
    
}

const register = (props: Props) => {

    

    return (
        <Layout title="Register">
        <Flex position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)">
            <Flex flexDirection="column">
            <Input placeholder="Username" mt="1rem"/>
            <Input placeholder="Password" mt="1rem" />
            <Button mt="1rem" variantColor="blue" >Register</Button>
            </Flex>
            
        </Flex>
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient,{ssr:true})(register)
