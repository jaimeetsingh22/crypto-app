import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, HStack, Heading, Image, VStack, Text, Button, RadioGroup, Radio } from '@chakra-ui/react';
import Loading from './Loading';
import ErrorComponent from './ErrorComponent';
import { Link } from 'react-router-dom';


const Coins = () => {
  const [Coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');
   

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  // Fetch data on component mount
  useEffect(() => {

    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    };

    fetchCoin();
  }, [currency, page]);// jab jab currency change hoga ya fetch hoga to component reload hoga

  const btns = new Array(132).fill(1);

  const changePage = (page) => {
    setPage(page)
    setLoading(true)
  }


  if (Error) return <ErrorComponent />

  return (


    <Container maxW={'container.xl'}>

      <Heading textAlign="center">Top Crypto</Heading>
      {/* pagination */}
      <HStack>
        <Button onClick={() => {
          setPage(prev => prev - 1)
          setLoading(true)
        }} isDisabled={page <= 0}>Prev</Button>
        <Text>{page}</Text>
        <Button onClick={() => {
          setPage(prev => prev + 1);
          setLoading(true)
        }} >Next</Button>
      </HStack>

      <RadioGroup value={currency} onChange={setCurrency}>
        <HStack spacing={'4'}>
          <Radio value={'inr'}>₹ INR</Radio>
          <Radio value={'eur'}>€ EUR</Radio>
          <Radio value={'usd'}>$ USD</Radio>
        </HStack>
      </RadioGroup>

      {
        loading ? <Loading /> : <>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {
              Coins.map((items) => (
                <CoinCard
                  img={items.image}
                  name={items.name}
                  key={items.id}
                  id={items.id}
                  price={items.current_price}
                  symbol={items.symbol}
                  currencySymbol={currencySymbol} />
              ))
            }
          </HStack>
          {/* pagination */}
          <HStack w={'full'} p={'8'} overflowX={'auto'} >
            {
              btns.map((i, index) => {
                return (<Button bgColor={'blackAlpha.900'} key={index} color={'white'} onClick={() => {
                  changePage(index + 1)
                }}>{index + 1}</Button>)
              })
            }
          </HStack>
        </>
      }
    </Container>
  )
}

const CoinCard = ({ id, name, img, price, symbol, currencySymbol = "₹" }) => {
  return (
    <Link to={`/coin/${id}`} >
      <VStack w={'52'} shadow={'lg'} p={'8'} bgColor={"#fff"} color={"#000"} m={'4'} borderRadius={'lg'} transition={'all 0.3s'}
        css={{
          "&:hover": {
            transform: "scale(1.1)"
          }
        }}
      >
        <Image h={'10'} w={'10'} objectFit={'contain'} src={img} alt={name} />
        <Heading size={"md"} noOfLines={1}>
          {symbol}
        </Heading>
        <Text fontSize={{ base: 'sm', md: 'lg' }} noOfLines={1}>{name}</Text>
        <Text fontSize={{ base: 'sm', md: 'lg' }} noOfLines={1}>{price ? `${currencySymbol} ${price}` : "NA"}</Text>
      </VStack>
    </Link>
  );
}






export default Coins