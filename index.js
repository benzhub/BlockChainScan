const  axios =  require('axios');
const addressArray = require('./address.json')

const btcScan = async (address) => { 
    try {
        const res = await axios.get(`https://btcscan.org/api/address/${address}`)
            return +res.data.chain_stats.funded_txo_sum / 100000000 - +res.data.chain_stats.spent_txo_sum / 100000000
    } catch (error) {
        console.log(err)
    }
}

// 請求太快被鎖的時候可以使用
(async () => {
        for (let item of addressArray){
            const amount = await btcScan(item.address)
            if (amount > 0) {
                console.log(`${item.user}: Have BTC is ${amount}`)
            }
        }
    }
)();

// for (let item of addressArray){
//     btcScan(item.address)
//         .then((amount) => {
//             if (amount > 0) {
//                 console.log(`${item.user}: Have BTC is ${amount}`)
//             }
//         })
// }