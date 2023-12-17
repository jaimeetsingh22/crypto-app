import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    return (
        <Box
            bgColor={'blackAlpha.900'}
            color={'whiteAlpha.700'}
            minH={'48'}
            //    px={{ base: "2", md: "16" }}
            px={'16'}
            py={["16", "8"]}
        >
            <Stack direction={['column','row']} h={'full'} alignItems={'center'}>
                <VStack w={'full'} alignItems={['center','flex-start']}>
                <Text fontWeight={'bold'} >
                About This site
                </Text>
                <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={['center','left']}>It is the best Crypto web app. where you can find all the information related to crypto trading </Text>
                </VStack>
                <VStack>
                   <Avatar boxSize={'28'} mt={['4','0']}/>
                  <Text>
                    Our founder
                  </Text>
                </VStack>
            </Stack>
        </Box>
    )
}

export default Footer