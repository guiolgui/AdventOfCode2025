const { table, log } = require('console');
const tools = require('../General/tools');

function main() {
    // tools.readFileSync('./input')
    // tools.readFileSync('./input_test')
    const sFileInput = 'input'; 
    // const sFileInput = 'input_test';
    tools.readFileSync(require('path').resolve(__dirname, sFileInput))
        .then((data) => { 
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            let t = data.split('\r\n');
            // let t = data.split('\r\n').map(m => m.split(''));
            console.time('P1');
            console.log('Partie 1 :>> ',part_one(t));
            console.timeEnd('P1');

            console.time('P2');
            console.log('Partie 2 :>> ',part_two(t));
            console.timeEnd('P2');
        })
        .catch((err) => {
            console.error(err);
        });
}

function part_one(t) {
    let result = 0;
    for (const bank of t) {
        let bankJoltage = '';
        let tBatteries = bank.split('').map(x=>parseInt(x));
        //get max of first digit
        
        const indexOfMaxValue1 = tBatteries.indexOf(Math.max(...tBatteries.slice(0,-1)));
        bankJoltage = tBatteries[indexOfMaxValue1].toString();
        bankJoltage += Math.max(...tBatteries.slice(indexOfMaxValue1+1)).toString();
        // console.log(tBatteries.slice(0, -1));
        // console.log(tBatteries.slice(indexOfMaxValue1+1, -1));
        // console.log(bankJoltage);
        
        result+=parseInt(bankJoltage);
    }
    return result;
}

function part_two(t) {
    let result = 0;
    for (const bank of t) {
        let bankJoltage = '';
        let tBatteries = bank.split('').map(x => parseInt(x));
        let nextIndex = -1;
        let leng = tBatteries.length;
        for (let i = 11; i > 0; i--) {
            const indexOfMaxValue = tBatteries.indexOf(Math.max(...tBatteries.slice(0, -i)));
            // console.log(tBatteries.join(''), tBatteries.slice(0, -i).join(''), indexOfMaxValue);
            
            bankJoltage += tBatteries[indexOfMaxValue].toString();
            tBatteries.splice(0,indexOfMaxValue+1);
            // console.log("Max array btw", nextIndex + 1, -i, tBatteries.slice(nextIndex + 1, -i));
            
            // const indexOfMaxValue = tBatteries.indexOf(Math.max(...tBatteries.slice(nextIndex+1, -i)));
            // nextIndex = indexOfMaxValue;
            // bankJoltage += tBatteries[indexOfMaxValue].toString();
            // // bankJoltage += Math.max(...tBatteries.slice(indexOfMaxValue + (12-i+1))).toString();
            // console.log(bankJoltage);
        }

        bankJoltage += Math.max(...tBatteries).toString();
        // console.log(tBatteries.slice(0, -1));
        // console.log(tBatteries.slice(indexOfMaxValue1+1, -1));
        // console.log(bankJoltage);

        result += parseInt(bankJoltage);
    }
    return result;
}

main();
