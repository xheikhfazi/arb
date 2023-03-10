const axios = require('axios');
const Web3 = require('web3');
const axiosRateLimit = require('axios-rate-limit');
const BigNumber = require('bignumber.js');

const API_URL1 = 'https://api.1inch.io/v5.0/137/quote';
const API_URL2 = 'https://apiv5.paraswap.io/prices/';
const Inchswap_route = 'https://api.1inch.io/v5.0/137/swap';

const web3 = new Web3(new Web3.providers.HttpProvider('https://crimson-special-sanctuary.matic.discover.quiknode.pro/b7817425d4cb289e007421eb40c2d26886cde38e/'));



const Abi=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addressProvider",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ADDRESSES_PROVIDER",
		"outputs": [
			{
				"internalType": "contract IPoolAddressesProvider",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "POOL",
		"outputs": [
			{
				"internalType": "contract IPool",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "premium",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "initiator",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "params",
				"type": "bytes"
			}
		],
		"name": "executeOperation",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "inchAddress",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paraAddress",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenA",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "Inch",
				"type": "bytes"
			},
			{
				"internalType": "address",
				"name": "_tokenB",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "fromToken",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "toToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "fromAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "toAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expectedAmount",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "callees",
						"type": "address[]"
					},
					{
						"internalType": "bytes",
						"name": "exchangeData",
						"type": "bytes"
					},
					{
						"internalType": "uint256[]",
						"name": "startIndexes",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "values",
						"type": "uint256[]"
					},
					{
						"internalType": "address payable",
						"name": "beneficiary",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "partner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "feePercent",
						"type": "uint256"
					},
					{
						"internalType": "bytes",
						"name": "permit",
						"type": "bytes"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					},
					{
						"internalType": "bytes16",
						"name": "uuid",
						"type": "bytes16"
					}
				],
				"internalType": "struct MyData",
				"name": "data",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Samount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "requestFlashLoan",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];







//<*******   ADDRESSESSSSSSSSSS  ********>

const sender = '0x41218496Cfd4a4647b2D8433C2A102C778a0612a';
const myWalletAddress = '0x1154296960b71b73A4079E5b00575F3d70d10f6b';
const privateKey = 'c541db76c04c366bd72fb24b19ef260b5f035140684498db4e52273feaf2c46d';

const contractAddress = '0xe33645fd5BbdAA65272Fe51E64cC41eCC4c7540D';
const contract = new web3.eth.Contract(Abi, contractAddress );



//<*******   VARIABLE   ********>
var ParaData_B;
var InchData_B;
var ParaData_S;
var InchData_S;

let end_P;
let end_I;


//<*******   INITIALIZAION CALLING   ********>
const fromTokenAddress1 = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
const toTokenAddress1 = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';
const amount2 = '100000000';
const srcDec = 6;
const desDec = 18;
const side2 = 'SELL';
const netId = 137;




async function checkArbitrage() {
  try {

    //<*******   BUY COMPUTATION   ********>

    const response1 = await axios.get(`${API_URL1}?fromTokenAddress=${fromTokenAddress1}&toTokenAddress=${toTokenAddress1}&amount=${amount2}`);
    const { data } = response1;
    let { toTokenAmount: buyPrice1 } = data;
    let inchbuy = buyPrice1/1e18;

    const response2 = await axios.get(`${API_URL2}?srcToken=${fromTokenAddress1}&destToken=${toTokenAddress1}&amount=${amount2}&srcDecimals=${srcDec}&destDecimals=${desDec}&side=${side2}&network=${netId}`);
    const { priceRoute } = response2.data;
    let buyPrice2 = priceRoute.destAmount;
    let parabuy = buyPrice2 / 1e18;

    const buyresponse = await axios.get(`${Inchswap_route}?fromTokenAddress=${fromTokenAddress1}&toTokenAddress=${toTokenAddress1}&amount=${amount2}&fromAddress=${sender}&slippage=1&disableEstimate=true`);
    const { data: data3 } = buyresponse;
    let tx = data3.tx;
    InchData_B = tx.data;

    // const amountP = new BigNumber(buyPrice1);
    const PB_response = await axios.post('https://apiv5.paraswap.io/transactions/137?ignoreChecks=true&ignoreGasEstimate=true&onlyParams=true', {
      "srcToken": `${fromTokenAddress1}`,
      "destToken": `${toTokenAddress1}`,
      "srcAmount": amount2,
      "slippage": 3000,
      "priceRoute": priceRoute,
      "userAddress": "0x5f708A25Fde3919eF527B6Baf49F266bBA1a54e3",
      "partner": "paraswap.io",
      "srcDecimals": srcDec,
      "destDecimals": desDec
    });
  
    const { data: inputData } = PB_response;
    const myData = {
      fromToken: inputData[0].fromToken,
      toToken: inputData[0].toToken,
      fromAmount: inputData[0].fromAmount,
      toAmount: inputData[0].toAmount,
      expectedAmount: inputData[0].expectedAmount,
      callees: inputData[0].callees,
      exchangeData: inputData[0].exchangeData,
      startIndexes: inputData[0].startIndexes,
      values: inputData[0].values,
      beneficiary: inputData[0].beneficiary,
      partner: inputData[0].partner,
      feePercent: inputData[0].feePercent,
      permit: inputData[0].permit,
      deadline: inputData[0].deadline,
      uuid: inputData[0].uuid
      };
  
      ParaData_B=myData;

  
    //<*******   SELL COMPUTATION   ********>
    
    const amountI = new BigNumber(buyPrice2);
    const response3 = await axios.get(`${API_URL1}?fromTokenAddress=${toTokenAddress1}&toTokenAddress=${fromTokenAddress1}&amount=${amountI}`);
    const { data: data2 } = response3;
    let { toTokenAmount: sellPrice1 } = data2;
    end_I=sellPrice1;
    sellPrice1 = sellPrice1/1e6;
 

    
    const amountP = new BigNumber(buyPrice1);
    const response4 = await axios.get(`${API_URL2}?srcToken=${toTokenAddress1}&destToken=${fromTokenAddress1}&amount=${amountP}&srcDecimals=${desDec}&destDecimals=${srcDec}&side=${side2}&network=${netId}`);
    const { priceRoute: priceRoute2 } = response4.data;
    let sellPrice2 = priceRoute2.destAmount;
    end_P=sellPrice2;
    sellPrice2 = sellPrice2 / 1e6;

   
    const buyresponse2 = await axios.get(`${Inchswap_route}?fromTokenAddress=${toTokenAddress1}&toTokenAddress=${fromTokenAddress1}&amount=${amountI}&fromAddress=${sender}&slippage=1&disableEstimate=true`);
    const { data: data4 } = buyresponse2;
    let tx2 = data4.tx;
    InchData_S = tx2.data;

    
    const PS_response = await axios.post('https://apiv5.paraswap.io/transactions/137?ignoreChecks=true&ignoreGasEstimate=true&onlyParams=true', {
      "srcToken": `${toTokenAddress1}`,
      "destToken": `${fromTokenAddress1}`,
      "srcAmount": amountP,
      "slippage": 3000,
      "priceRoute": priceRoute2,
      "userAddress": "0x5f708A25Fde3919eF527B6Baf49F266bBA1a54e3",
      "partner": "paraswap.io",
      "srcDecimals": desDec,
      "destDecimals": srcDec
    });
  
    const { data: inputData2 } = PS_response;
    const myData2 = {
      fromToken: inputData2[0].fromToken,
      toToken: inputData2[0].toToken,
      fromAmount: inputData2[0].fromAmount,
      toAmount: inputData2[0].toAmount,
      expectedAmount: inputData2[0].expectedAmount,
      callees: inputData2[0].callees,
      exchangeData: inputData2[0].exchangeData,
      startIndexes: inputData2[0].startIndexes,
      values: inputData2[0].values,
      beneficiary: inputData2[0].beneficiary,
      partner: inputData2[0].partner,
      feePercent: inputData2[0].feePercent,
      permit: inputData2[0].permit,
      deadline: inputData2[0].deadline,
      uuid: inputData2[0].uuid
      };
  
      ParaData_S=myData2;

    console.log("Buy 1inch: " + inchbuy);
    console.log("Buy Para: " + parabuy);

    console.log("Buy Para SELL at 1inch: " + sellPrice1);
    console.log("Buy 1inch SELL at Para: " + sellPrice2);
    console.log("_________________________________");



      let profit=100.08; 

	  let isTransactionSent = false;
	  if (!isTransactionSent && sellPrice1 >= profit && sellPrice1 > sellPrice2)
	  {
		  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
		  console.log("Buy at PARA and Sell at INCH");

		  if(ParaData_B.toToken != undefined)
		  {
  
		  console.log(end_I);
		  const nonce = await web3.eth.getTransactionCount(myWalletAddress);
		  const gasPrice = await web3.eth.getGasPrice();
		  const gasLimit = 3000000; // or your desired gas limit
		  const value = 0; // or your desired ether value to send with the transaction
		  let dex=2;
		  const data = contract.methods.requestFlashLoan(fromTokenAddress1, InchData_S , toTokenAddress1 , ParaData_B,amount2 , end_I ,dex).encodeABI();
		  
		  const txObject = {
			nonce,
			gasPrice,
			gasLimit,
			to: contractAddress,
			value,
			data
		  };
		  
		  const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
		  const transactionHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		  console.log('Transaction hash:', transactionHash);
		  isTransactionSent = true;

		}
		else
		{
			console.log("GOT UNDEFINEDDDD");
			console.log(ParaData_B.toToken)
		}
	  }
	  else if (!isTransactionSent && sellPrice2 >= profit && sellPrice2 > sellPrice1)
      {

        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("Buy at 1INCH and Sell at PARA");
		
		if(ParaData_B.toToken != undefined)
		{

        console.log(end_P);
        const nonce = await web3.eth.getTransactionCount(myWalletAddress);
        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = 3000000; // or your desired gas limit
        const value = 0; // or your desired ether value to send with the transaction
        let dex=1;
        const data = contract.methods.requestFlashLoan(fromTokenAddress1, InchData_B , toTokenAddress1 , ParaData_S,amount2 , end_P ,dex).encodeABI();
        
        const txObject = {
          nonce,
          gasPrice,
          gasLimit,
          to: contractAddress,
          value,
          data
        };
        
        const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
        const transactionHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction hash:', transactionHash);
		isTransactionSent = true;

	   }else
	   {
		   console.log("GOT UNDEFINEDDDD");
		   console.log(ParaData_B.toToken)
	   }
    }
    else
    {
        console.log("NO ARBItrage");
    }
    console.log("_________________________________");



    } catch (error) {
        console.error(error);
        }
        }

        
setInterval(checkArbitrage,6000);
   
