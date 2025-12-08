const tools = require('../General/tools');

let bLog = true; let sFileInput = 'input'; 
bLog = false;
// sFileInput = 'input_test';

function main() {
    // tools.readFileSync('./input')
    // tools.readFileSync('./input_test')
    //transformez au préalable le fichier en fichier CSV ";"
    // const sFileInput = 'input_test';
    tools.readFileSync(require('path').resolve(__dirname, sFileInput+'_csv'))
        .then((data) => { 
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            let t = data.split('\r\n');
            // let t = data.split('\r\n').map(m => m.split(''));
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
    tools.readFileSync(require('path').resolve(__dirname, sFileInput+'_brut'))
        .then((data) => {
            let t = data.split('\r\n');
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
    let tSplitted = t.map(x=>x.split(';'));
    //transposition de lignes en colonnes
    let newT = [];
    for (let i = 0; i < tSplitted.length; i++) {
        for (let j = 0; j < tSplitted[i].length; j++) {
            if(!newT[j]){
                newT[j] = [];
            }
            newT[j][i] = tSplitted[i][j];
            // const element = tSplitted[i][j];
        }        
    }
    let nbCol = newT[0].length;
    let nbRow = newT.length;
    stdoutl(`nbCol: ${nbCol}\tnbRow: ${nbRow}`)

    for (let i = 0; i < nbRow; i++) {
        let operator = newT[i][nbCol-1];
        stdoutl(`operator col${i}: ${operator}`);
        result += operate(newT[i].slice(0, nbCol - 1), operator);
    }
    logTables(newT);
    return result;
}

function part_two(t) {
    let result = 0;
    logTables(t);
    let nbCol = t[0].length;
    let nbRow = t.length;
    stdoutl(`nbCol: ${nbCol}\tnbRow: ${nbRow}`)
    let bFlag = true;
    let posCol = 0;
    do {
        let operator = t[nbRow - 1][posCol];
        let tNumbers = [];
        while (true) {
            posCol++;
            let sNumb = '';
            for (let curRow = 0; curRow < nbRow-1; curRow++) {
                sNumb += t[curRow].substring(posCol - 1, posCol);
            }
            if (sNumb.trim() != ''){
                tNumbers.push(parseInt(sNumb));
            } else{
                break;
            }
            logTables(tNumbers);
        }

        result += operate(tNumbers,operator);
        if (posCol >= nbCol){
            bFlag = false;
        }
    } while (bFlag);


    return result;
}

function operate(tNumbers,operator){
    switch (operator) {
        case '+':
            return  tNumbers.reduce(
                (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue),
                0,);
        case '*':
            return tNumbers.reduce(
                (accumulator, currentValue) => parseInt(accumulator) * parseInt(currentValue),
                1,);
    }
    return 0;
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
