import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, HStack, Heading, Image, VStack, Text, Box, Alert, Spinner } from '@chakra-ui/react';
import Loading from './Loading';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Error, setError] = useState(false);
    // Fetch data on component mount
    useEffect(() => {

        const fetchdata = async () => {
            try {
                const { data } = await axios.get('https://api.coingecko.com/api/v3/exchanges?per_page=100');
                console.log("Data", data);

                // the below method will automatically perform get request and we resolve the promise using then it does'nt need to stringyfy or convert into json file
                // axios("https://api.coingecko.com/api/v3/exchanges").then(res=>{
                //     console.log(res.data)
                //     setExchanges(res.data);
                // })

                setExchanges(data);
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        };
        fetchdata();
    }, []);


    if(Error) return <ErrorComponent/>;
    return (
        
            <Container maxW={'container.xl'}>


                {
                    loading ? <Loading /> : <>
                        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                            {
                                exchanges.map((items, index) => (
                                    <ExchangeCard img={items.image} name={items.name} url={items.url} rank={items.trust_score_rank} key={items.id} />
                                ))
                            }
                        </HStack>
                    </>
                }
            </Container>
       
    )
}

const ExchangeCard = ({ name, img, rank, url }) => {
    return (
        <a href={url}

            target={"blank"} // ye normal blank dene se ek hi new tab har link ko open karega and isse tabs waste nahi hoga
        >
            <VStack w={'52'} shadow={'lg'} p={'8'} bgColor={"#fff"} color={"#000"} m={'4'} borderRadius={'lg'} transition={'all 0.3s'}
                css={{
                    "&:hover": {
                        transform: "scale(1.1)"
                    }
                }}
            >
                <Image h={'10'} w={'10'} objectFit={'contain'} src={img} alt={name} />
                <Heading size={"md"} noOfLines={1}>
                    {rank}
                </Heading>
                <Text fontSize={{ base: 'sm', md: 'lg' }} noOfLines={1}>{name}</Text>
            </VStack>
        </a>
    );
}






export default Exchanges