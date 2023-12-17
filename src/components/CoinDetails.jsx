import { Box, Container, RadioGroup, Radio, HStack, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import axios from "axios";
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';


const CoinDetails = () => {
  const [Coins, setCoins] = useState({});
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const params = useParams();

  // Fetching data for the coin details page.
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchCase = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;
      default:
        setDays("24h")
        setLoading(true)
        break;
    }
  }



  useEffect(() => {

    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}`);

        // yaha data:chartData likhne ka matlb hai ki iska naam chartData ho jayega
        const { data: chartData } = await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        // console.log(params.id) 

        setCoins(data);
        setChartArray(chartData.prices)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    };

    fetchCoin();
  }, [params.id, currency, days]);

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  if (Error) return <ErrorComponent />;

  return (
    <Container maxW={'container.xl'}>

      {
        loading ? (<Loading />) : (
          <>
            <Box width={'full'} borderWidth={1}>
              <Chart currency={currencySymbol} arr={chartArray} days={days} />

            </Box>
            <HStack p={'4'} overflowX={'auto'}>
              
              {
                btns.map((btn, index) => (
                  <Button key={index} onClick={() => switchCase(btn)} variant="outline">{btn}</Button>
                ))
              }
            </HStack>

            <RadioGroup value={currency} onChange={setCurrency}>
              <HStack spacing={'4'}>
                <Radio value={'inr'}>₹ INR</Radio>
                <Radio value={'eur'}>€ EUR</Radio>
                <Radio value={'usd'}>$ USD</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
              <Text fontSize={'small'} alignSelf={'center'} opacity={'0.8'}>
                Last Updated on {Date().split('G')[0]}
              </Text>
              <Image src={Coins.image.large} w={'16'} h={'16'} objectFit={'cover'} />
              <Stat>
                <StatLabel>{Coins.name}</StatLabel>
                <StatNumber>{currencySymbol}{Coins.market_data.current_price[currency]}</StatNumber>
                <StatHelpText>
                  <StatArrow type={Coins.market_data.price_change_24h > 0 ? "increase" : "decrease"} />
                  {Coins.market_data.price_change_24h}%
                </StatHelpText>
              </Stat>
              <Badge fontSize={'2xl'} bgColor={'blackAlpha.900'} color={'#fff'}>
                # {Coins.market_cap_rank}
              </Badge>
              <CustomBar low={`${currencySymbol} ${Coins.market_data.low_24h[currency]}`} high={`${currencySymbol} ${Coins.market_data.high_24h[currency]}`} />
              <Box w={'full'} p={'4'} >
                <Item title={"Max Supply"} value={`${currencySymbol} ${Coins.market_data.max_supply}`} />
                <Item title={"Circulating Supply"} value={` ${currencySymbol} ${Coins.market_data.circulating_supply}`} />
                <Item title={"Market cap"} value={`${currencySymbol} ${Coins.market_data.market_cap[currency]}`} />
                <Item title={"All time low"} value={`${currencySymbol} ${Coins.market_data.atl[currency]}`} />
                <Item title={"All time high"} value={`${currencySymbol} ${Coins.market_data.ath[currency]}`} />
              </Box>
            </VStack>
          </>
        )
      }
    </Container>
  )
}

const CustomBar = ({ low, high }) => {
  return (
    <VStack w={'full'}>
      <Progress value={50} colorScheme='teal' w={"full"} />
      <HStack justifyContent={"space-between"} w={'full'}>
        <Badge children={low} colorScheme='red' />
        <Text fontSize={'sm'}>24H Range</Text>
        <Badge children={high} colorScheme='green' />
      </HStack>
    </VStack>
  )
}

export default CoinDetails

const Item = ({ title, value }) => (
  <HStack justifyContent={'space-between'} >
    <Text fontWeight={'900'} textTransform={'uppercase'} fontFamily={'serif'} letterSpacing={'widest'}>{title}</Text>
    <Text >{value}</Text>
  </HStack>
)