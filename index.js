import https from 'https';
import readline from 'readline';

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

const apiKey = {api key};
const url = 'https://v6.exchangerate-api.com/v6/{api key}/latest/INR';
function total(rate, amount) {
    return (rate * amount).toFixed(2);
}

const getCurrencyConverter = () =>{
    let data = "";
    https.get(url, (response) => {
        response.on('data' ,(chunk) => {
            data += chunk;
        })
        response.on('end', () => {
            const rates = JSON.parse(data).conversion_rates;
            rl.question("Enter the amount in INR : ", (amount) => {
                rl.question("Enter the Currency which you want to convert : ",(currency) => {
                    const rate = rates[currency.toUpperCase()]
                    if(rate){
                        console.log(`${amount} INR is approximately ${total(rate, amount)} ${currency.toUpperCase()}`)
                    }else{
                        console.log("Enter Correct code")
                    }
                    rl.close();

                })
                
            })
        })
    })
    

}
getCurrencyConverter();
