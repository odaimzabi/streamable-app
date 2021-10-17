

import { Button, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, PseudoBox, useDisclosure } from '@chakra-ui/core'
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react'
import { useCreateRoomMutation, useMeQuery } from '../generated/graphql';
import useAuth from '../utils/useAuth';

interface Props {

}

function CreateRoomModal({ }: Props): ReactElement {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [{fetching:fetching,data}]=useMeQuery()
    const [ytLink,setytLink]=useState({value:"",invalid:false})
    const [title,setTitle]=useState({value:"",invalid:false})
    const [,createRoom]=useCreateRoomMutation()
    const router=useRouter()
     
   

    const handleSubmit=async(e:any)=>{

        e.preventDefault()

        
       
        if (ytLink.value.lastIndexOf("watch?v=")!==-1){
            const pos=ytLink.value.lastIndexOf("watch?v=")
             const id=ytLink.value.substr(pos+8)
                 if (!id){
                     setytLink({value:ytLink.value,invalid:true})
                 }

                 const room=await createRoom({user:{id:parseInt(data?.Me?.id as string),username:data?.Me?.username},title:title.value,youtubeLink:id} as any)
             if (room.data?.CreateRoom){
                  router.push(`/room/${room.data?.CreateRoom.id}`)
             }
             
             }else {
                 setytLink({value:ytLink.value,invalid:true})
             }
            


    }
    return (
        <div>

            <PseudoBox
                role="group"
                maxW="sm"
                overflow="hidden"
                rounded="md"
                p={5}
                cursor="pointer"
                bg="white"
                boxShadow="md"
                _hover={{ bg: "blue.500" }}
                mr={"1.5rem"}
                onClick={onOpen}
            >
                <PseudoBox
                    fontWeight="semibold"
                    fontSize="lg"
                    mb={1}
                    color="gray.900"
                    _groupHover={{ color: "white" }}
                >
                    Create Room
        </PseudoBox>


                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create Room</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        <form onSubmit={handleSubmit}>

                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input id="title" 
                    placeholder="Title" 
                    onChange={(e:any)=>setTitle({value:e.target.value,invalid:false})}
                    isInvalid={title.invalid}
                    
                    />

                    <FormLabel htmlFor="yt-link">Youtube Link</FormLabel>
                    <Input 
                    id="yt-link" 
                    placeholder="Youtube Link" 
                    onChange={(e:any)=>setytLink({value:e.target.value,invalid:false})}
                    isInvalid={ytLink.invalid}
                    />
                    
                    
                    <ModalFooter>
                            <Button variantColor="blue" mr={3} onClick={onClose}>
                                Close
            </Button>
                            <Button variant="ghost" type="submit">Create</Button>
                        </ModalFooter>

                        </form>


                        </ModalBody>

                    </ModalContent>
                </Modal>

                <PseudoBox color="gray.700" mb={2} _groupHover={{ color: "white" }}>
                    Create your own room with a youtube link.
        </PseudoBox>
            </PseudoBox>


        </div>
    )
}

export default CreateRoomModal
