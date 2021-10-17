import Layout from '../components/Layout'
import {Flex,Box,Input,Button,List, ListItem, Divider, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormLabel} from "@chakra-ui/core"
import {PseudoBox} from "@chakra-ui/core"
import React, { useEffect, useRef, useState } from 'react'
import CreateRoomModal from '../components/CreateRoomModal'
import JoinRoomModal from '../components/JoinRoomModal'
import { createUrqlClient } from '../utils/createWithUrql'
import {withUrqlClient} from 'next-urql'
import useAuth from '../utils/useAuth'
const IndexPage = () =>{ 

  useAuth()


  return(
    <Layout title="Home Page">
      
      <Flex position="absolute" left="50%" top="50%" transform="translate(-50%,-50%)">
      <CreateRoomModal/>

      <Divider orientation="vertical"  borderColor="black" borderWidth={"3px"} mr="3rem"/>

    <JoinRoomModal/>

      </Flex>


    </Layout>
)
  }

export default withUrqlClient(createUrqlClient,{ssr:false})(IndexPage)
