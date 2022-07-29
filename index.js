require('dotenv').config()
const { ethers } = require("ethers");
const addressArray = require('./address.json')
const ERC20ABI = require('./ERC20.json');

const provider = new ethers.providers.AlchemyProvider("homestead", process.env.API_KEY)

const getAddressETHBalance = async (address) => {
        const hexBalance = await provider.getBalance(address)
        const balance = ethers.utils.formatEther(hexBalance)
        return balance
}

const getAddressUSDTBalance = async (address) => {
    const usdtContractAddress = process.env.ERC20_CONTRACT
    const USDT = new ethers.Contract(usdtContractAddress, ERC20ABI, provider);
    const hexBalance = await USDT.balanceOf(address);
    const balance = ethers.utils.formatUnits(hexBalance, 6)
    return balance
}

(
    async () => {
        for (let item of addressArray){
            getAddressUSDTBalance(item.address).then((balance) => { 
                if( +balance > 0){
                    console.log(`${item.user}-${item.address} have ERC20 USDT balance is ${balance}`)
                }
            })

            getAddressETHBalance(item.address).then((balance) => { 
                if( +balance > 0){
                    console.log(`${item.user}-${item.address} have ETH balance is ${balance}`)
                }
            })
        }
    }
)();
