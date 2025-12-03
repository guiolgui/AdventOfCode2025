const { error, log } = require('console');
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
            console.log('Partie 1 :>> ', part_one(t));
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
    let current = 50;
    t.forEach(x => {
        current += 100;
        let dir = x.substring(0, 1);
        let num = parseInt(x.substring(1));
        // console.log('Base',current);

        switch (dir) {
            case 'L':
                current -= num;
                break;
            case 'R':
                current += num;
                break;

            default:
                console.error('Direction inconnue !');
                return -1;
        }
        // console.log('Input applied',current);
        current = current % 100;
        // console.log('Modulo applied',current);
        // console.log('--------------------');
        if (current == 0) {
            result++;
        }

    });

    return result;
}

function part_two(t) {
    // console.log(t[3407]);
    // console.log(t[3408]);
    // console.log(t[3409]);
    // console.log(t[3410]);
    
    let result = 0;
    let current = 50;
    let tLog = [];
    t.forEach(x => {
        let oLog = {};
        oLog.instr = x;
        tLog.push(oLog);
        // tLog[x] = oLog;
        // oLog.instr = x;     
        let dir = x.substring(0, 1);
        let num = parseInt(x.substring(1));
        // oLog.key
        oLog.Base = current;
        oLog.prev_result = result;
        // if (current == 0 && dir == 'L'){
        //     result--;
        //     oLog.action.push('--');
        // }
        switch (dir) {
            case 'L':
                result += Math.floor((num+100-(current))/100);
                if (current == 0)
                    result--;
                current -= num;
                break;

            case 'R':
                result += Math.floor((num+(current))/100);
                current += num;
                break;

            default:
                console.error('Direction inconnue !');
                return -1;
        }
        //On remet dans la bonne tranche de numéro
        while (current < 0) {
            current += 100;
        }
        // if (current >= 200 || current <= 100) {
        //     result++;
        //     oLog.action.push('++');
        // } 
        oLog.applied = current;
        current = current % 100;
        oLog.stop_on = current;
        oLog.result = result;
        // tLog.push(oLog);

    });
    // console.table(tLog);
    
    return result;
}

main();
