const tools = require('../General/tools');

let bLog = true; let sFileInput = 'input';
// bLog = false;
sFileInput = 'input_test';

function main() {
    
    tools.readFileSync(require('path').resolve(__dirname, sFileInput))
        .then((data) => { 
            let t = data.split('\r\n');
            console.time('P1');
            console.log('Partie 1 :>> ',part_one(t));
            console.timeEnd('P1');

            // console.time('P2');
            // console.log('Partie 2 :>> ',part_two(t));
            // console.timeEnd('P2');
        })
        .catch((err) => {
            console.error(err);
        });
}

function part_one(t) {
    let result = 0;

    return result;
}

function part_two(t) {
    let result = 0;
    return result;
}

function logTables(tTable) {
    if (!bLog) {
        return;
    }
    console.table(tTable);
}

function stdout(sOutput) {
    if (!bLog) {
        return;
    }
    process.stdout.write(sOutput);
}

function jumpline() {
    if (!bLog) {
        return;
    }
    process.stdout.write(`\r\n`);
}

function stdoutl(sOutput) {
    if (!bLog) {
        return;
    }
    stdout(sOutput);
    jumpline();
}


main();
