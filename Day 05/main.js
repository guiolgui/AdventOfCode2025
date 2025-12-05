const tools = require('../General/tools');

let bLog = true;
bLog = false;

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
            console.time('Pall');
            console.log(':>> ',part_one(t));
            console.timeEnd('Pall');

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
    //get ranges
    let rRanges = [];
    let bFlag = true;
    let i = 0;
    while(bFlag){
        if (t[i] == '' || t[i] == undefined){
            bFlag = false;
            continue;
        }

        rRanges.push(t[i++].split('-').map(x=>parseInt(x)));
    }

    rRanges.sort((a, z) => {
        if (a[0] <= z[0]) {
            return -1;
        }
        if (a[0] == z[0] && a[1] <= z[1]) {
            return -1;
        }
        return 1;
    });
    
    // for (i = i+1; i < t.length;i++) {
    //     //vérifier que le product ID est dans une des ranges
    //     for (const range of rRanges) {
    //         if (parseInt(t[i]) >= range[0] && parseInt(t[i]) <= range[1]){
    //             result++;
    //             break;
    //         }
    //         if ((parseInt(t[i]) < range[0] && parseInt(t[i]) < range[1])){
    //             break;
    //         }
    //     }
    // }
    let newT = [];

    while (true) {
        if (rRanges.length == 0) {
            break;
        }
        if (rRanges.length == 1) {
            newT.push(rRanges.splice(0, 1)[0]);
            break;
        }

        let b1 = rRanges[0];
        let b2 = rRanges[1];
        if (b1[1] < b2[0]) {
            newT.push(rRanges.splice(0, 1)[0]);
            continue;
        }
        if (b1[0] <= b2[0] && b2[0] <= b1[1] && b2[1] >= b1[1]) {
            rRanges[0][0] = b1[0];
            rRanges[0][1] = b2[1];
            rRanges.splice(1, 1);
            continue;
        }
        if (b1[0] <= b2[0] && b2[1] <= b1[1]) {
            rRanges.splice(1, 1);
            continue;
        }
    }

    for (i = i+1; i < t.length;i++) {
        //vérifier que le product ID est dans une des ranges
        for (const range of newT) {
            if (parseInt(t[i]) >= range[0] && parseInt(t[i]) <= range[1]){
                result++;
                break;
            }
            if ((parseInt(t[i]) < range[0] && parseInt(t[i]) < range[1])){
                break;
            }
        }
    }
    logTables(rRanges);
    stdout(`${i}`);
    jumpline();
    let resultp2 = 0;
    for (const range of newT) {
        resultp2 += range[1] - range[0] + 1;
    }
    return `\r\n\tP1: ${result}\r\n\tP2: ${resultp2}`;
}

function part_two(t) {
    let result = 0;
    //get ranges
    let rRanges = [];
    let bFlag = true;
    let i = 0;
    // let oRanges = {};
    // while (bFlag) {
    //     if (t[i] == '' || t[i] == undefined) {
    //         bFlag = false;
    //         continue;
    //     }
    //     let [min, max] = t[i++].split('-').map(x => parseInt(x));
    //     while (min <=max) {
    //         oRanges[min++] = true;
    //     }
    // }

    while (bFlag) {
        if (t[i] == '' || t[i] == undefined) {
            bFlag = false;
            continue;
        }

        rRanges.push(t[i++].split('-').map(x => parseInt(x)));
    }

    rRanges.sort((a, z) => {
        if (a[0] <= z[0]) {
            return -1;
        }
        if (a[0] == z[0] && a[1] <= z[1]) {
            return -1;
        }
        return 1;
    });
    
    let newT = [];

    while (true) {
        if (rRanges.length == 0) {
            break;
        }
        if (rRanges.length == 1) {
            newT.push(rRanges.splice(0, 1)[0]);
            break;
        }

        let b1 = rRanges[0];
        let b2 = rRanges[1];
        if (b1[1] < b2[0]) {
            newT.push(rRanges.splice(0, 1)[0]);
            continue;
        }
        if (b1[0] <= b2[0] && b2[0] <= b1[1] && b2[1] >= b1[1]) {
            rRanges[0][0] = b1[0];
            rRanges[0][1] = b2[1];
            rRanges.splice(1, 1);
            continue;
        }
        if (b1[0] <= b2[0] && b2[1] <= b1[1]) {
            rRanges.splice(1, 1);
            continue;
        }
    }

    for (const range of newT) {
        result += range[1] - range[0] + 1;
    }
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


main();
