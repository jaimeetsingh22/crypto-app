import React from 'react'
import { Box,Alert,Heading } from '@chakra-ui/react';

const ErrorComponent = () => {
  return (
    <Box px={5} py={2} display={'flex'} alignItems={'center'} justifyContent={'center'} h={'70vh'} w={'full'}>
    <Alert  status="error">
     <Heading color={'red'} textAlign={'center'} w={'full'} >
        Error while fetching Coins!!
     </Heading>
    </Alert>
</Box>
  )
}

export default ErrorComponent