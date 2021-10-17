

import { Button, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, PseudoBox, useDisclosure } from '@chakra-ui/core'
import React, { ReactElement } from 'react'
import useAuth from '../utils/useAuth';

interface Props {

}

function JoinRoomModal({ }: Props): ReactElement {

    const { isOpen, onOpen, onClose } = useDisclosure();

    // useAuth()

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
                    Join Room
        </PseudoBox>


                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Join Room</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        <form>

                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input id="title" placeholder="Title" />

                    <FormLabel htmlFor="yt-link">Youtube Link</FormLabel>
                    <Input id="yt-link" placeholder="Youtube Link" />


                        </form>


                        </ModalBody>

                        <ModalFooter>
                            <Button variantColor="blue" mr={3} onClick={onClose}>
                                Close
            </Button>
                            <Button variant="ghost">Join</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <PseudoBox color="gray.700" mb={2} _groupHover={{ color: "white" }}>
                    Join an existing room and have fun!
        </PseudoBox>
            </PseudoBox>


        </div>
    )
}

export default JoinRoomModal
