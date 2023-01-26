const axios = require('axios');
const axiosRateLimit = require('axios-rate-limit');

const API_URL1 = 'https://api.1inch.io/v5.0/137/quote';
const API_URL2 = 'https://apiv5.paraswap.io/prices/';

const fromTokenAddress1 = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';
const toTokenAddress1 = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
const amount1 = '1000000000000000000';
const amount2 = '1000000';

const inTokenAddress2 = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';
const outTokenAddress2 = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174';
const amount3 = 1000000000000000000;
const amount4 = 1000000;
const srcDec = 18;
const desDec = 6;
const side = 'SELL';
const side2 = 'SELL';
const netId = 137;

const rateLimitedAxios = axiosRateLimit(axios.create(), {
  maxRequests: 10,
  perMilliseconds: 60000
});

async function checkArbitrage() {
  try {
    const response1 = await axios.get(`${API_URL1}?fromTokenAddress=${toTokenAddress1}&toTokenAddress=${fromTokenAddress1}&amount=${amount2}`);
    const { data } = response1;
    let { toTokenAmount: buyPrice1 } = data;
    buyPrice1 = buyPrice1/1e18;

    const response2 = await axios.get(`${API_URL2}?srcToken=${outTokenAddress2}&destToken=${inTokenAddress2}&amount=${amount4}&srcDecimals=${desDec}&destDecimals=${srcDec}&side=${side2}&network=${netId}`);
    const { priceRoute } = response2.data;
    let buyPrice2 = priceRoute.destAmount;
    buyPrice2 = buyPrice2 / 1e18;

    // if (buyPrice1 > buyPrice2) {
    //   console.log(`Arbitrage opportunity: 1inch buy price is higher at ${buyPrice1} compared to Paraswap buy price at ${buyPrice2}`);
    // }

    const response3 = await axios.get(`${API_URL1}?fromTokenAddress=${fromTokenAddress1}&toTokenAddress=${toTokenAddress1}&amount=${amount1}`);
    const { data: data2 } = response3;
    let { toTokenAmount: sellPrice1 } = data2;
    sellPrice1 = sellPrice1/1e6;

    const response4 = await axios.get(`${API_URL2}?srcToken=${inTokenAddress2}&destToken=${outTokenAddress2}&amount=${amount3}&srcDecimals=${srcDec}&destDecimals=${desDec}&side=${side}&network=${netId}`);
    const { priceRoute: priceRoute2 } = response4.data;
    let sellPrice2 = priceRoute2.destAmount;

    sellPrice2 = sellPrice2 / 1e6;


    console.log("Buy 1inch: " + buyPrice1);
    console.log("Buy Para: " + buyPrice2);

    console.log("Sell 1inch: " + sellPrice1);
    console.log("Sell Para: " + sellPrice2);
    console.log("_________________________________");

    if (buyPrice1 < buyPrice2 && sellPrice2>sellPrice1)
    {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("Buy at 1Inch and Sell at Para");
    }
    else if (buyPrice2 < buyPrice1 && sellPrice1>sellPrice2)
    {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("Buy at Para and Sell at 1Inch");
    }
    else
    {
        console.log("NO ARBItrage");
    }
    console.log("_________________________________");


    // if (sellPrice1 < sellPrice2)
    // {
    //     console.log(`Arbitrage opportunity: 1inch sell price is lower at ${sellPrice1} compared to Paraswap sell price at ${sellPrice2}`);
    // }
    // else
    // {
    //     console.log(`Paraswap Sell : ${sellPrice2} Greater than 1Inch Sell: ${sellPrice1}`);
    // }
    } catch (error) {
        console.error(error);
        }
        }
        


        // const days = 30;
        // const interval = 4000; // 4 seconds
        // const runTime = days * 24 * 60 * 60 * 1000; // convert days to milliseconds
        // const endTime = Date.now() + runTime;
        
        // while (Date.now() < endTime) {
        //   checkArbitrage();
        //   setTimeout(() => {}, interval); // wait for 4 seconds
        // }
        
 setInterval(checkArbitrage,4000);
   
