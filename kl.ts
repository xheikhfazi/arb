const axios = require('axios');
const axiosRateLimit = require('axios-rate-limit');
//sd
const API_URL1 = 'https://api.1inch.io/v5.0/137/quote';
const API_URL2 = 'https://apiv5.paraswap.io/prices/';

const fromTokenAddress1 = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';
const toTokenAddress1 = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
const amount1 = '1000000000000000000';
const amount2 = '5000000000';

const inTokenAddress2 = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';
const outTokenAddress2 = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174';
const amount3 = 1000000000000000000;
const amount4 = 5000000000;
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
    let inchbuy = buyPrice1/1e18;

    const response2 = await axios.get(`${API_URL2}?srcToken=${outTokenAddress2}&destToken=${inTokenAddress2}&amount=${amount4}&srcDecimals=${desDec}&destDecimals=${srcDec}&side=${side2}&network=${netId}`);
    const { priceRoute } = response2.data;
    let buyPrice2 = priceRoute.destAmount;
    let parabuy = buyPrice2 / 1e18;

    // if (buyPrice1 > buyPrice2) {
    //   console.log(`Arbitrage opportunity: 1inch buy price is higher at ${buyPrice1} compared to Paraswap buy price at ${buyPrice2}`);
    // }

    let am =parabuy *1e18;
    const response3 = await axios.get(`${API_URL1}?fromTokenAddress=${fromTokenAddress1}&toTokenAddress=${toTokenAddress1}&amount=${am}`);
    const { data: data2 } = response3;
    let { toTokenAmount: sellPrice1 } = data2;
    sellPrice1 = sellPrice1/1e6;

    let am2 =inchbuy *1e18;
    const response4 = await axios.get(`${API_URL2}?srcToken=${inTokenAddress2}&destToken=${outTokenAddress2}&amount=${am2}&srcDecimals=${srcDec}&destDecimals=${desDec}&side=${side}&network=${netId}`);
    const { priceRoute: priceRoute2 } = response4.data;
    let sellPrice2 = priceRoute2.destAmount;

    sellPrice2 = sellPrice2 / 1e6;


    console.log("Buy 1inch: " + inchbuy);
    console.log("Buy Para: " + parabuy);

    console.log("Buy Para SELL at 1inch: " + sellPrice1);
    console.log("Buy 1inch SELL at Para: " + sellPrice2);
    console.log("_________________________________");

    if (sellPrice1 > 50000)
    {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("Buy at PARA and Sell at 1INCH");
  
    }
    else if (sellPrice2 > 50000)
    {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("Buy at 1INCH and Sell at PARA");
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

        
 setInterval(checkArbitrage,5000);
   
