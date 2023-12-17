import React from 'react'
import { Box, Center, Spinner } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Center minHeight='60vh' >
      <Box transform={'scale(3)'}>
        <Spinner thickness='2px' size={'xl'}  speed='0.4s' emptyColor='gray.200' color='blue.800'/>
      </Box>
    </Center>
  )
}

export default Loading