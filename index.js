
require('dotenv').config()
const addressArray = require('./address.json')
const TronWeb = require('tronweb')
const tronWeb = new TronWeb({
    fullHost: process.env.API_URL,
    headers: { "TRON-PRO-API-KEY": process.env.API_KEY },
    privateKey: process.env.PRIVATE_KEY
})

const usdt = async (user, address, searchContract) => {
    try {        
        const { abi } = await tronWeb.trx.getContract(searchContract);
        const contract = tronWeb.contract(abi.entrys, searchContract);
        const balance = await contract.methods.balanceOf(address).call();
        if (+balance > 0){
            return `${user} TRC-20 USDT balance is: ${(+balance / 1000000).toString()}`;
        }
    } catch (error) {
        console.log(error)
    }
}

const app = async (user, address) => {
    try {        
        const userBalance = await tronWeb.trx.getBalance(address);
        if(+userBalance > 0){
            return `${user} TRX balance is: ${ (+userBalance / 1000000).toString() }`;
        }
    } catch (error) {
        console.log(error)
    }
};

// 為了防止請求過快，使用await 等待
( async () => { 
    for ( let item of addressArray) {
        // console.log(item.user, item.address)
        const trxResult = await app(item.user, item.address);
        if(trxResult !== undefined){
            console.log(trxResult)
        }
        const usdtResult = await usdt(item.user, item.address, 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');
        if(usdtResult !== undefined){
            console.log(usdtResult)
        }
    }
})();
