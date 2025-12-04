const { log } = require('console');
const tools = require('../General/tools');

let bLog = true;
bLog = false;
const checkDir = {
    "UP":[-1,0],
    "UP_RIGHT":[-1,1],
    "RIGHT":[0,1],
    "DOWN_RIGHT":[1,1],
    "DOWN":[1,0],
    "DOWN_LEFT":[1,-1],
    "LEFT":[0,-1],
    "UP_LEFT":[-1,-1]
}

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

function part_one(tab) {
    let result = 0;
    let t = [...tab];
    //ajouter une ligne en haut et en bas rempli de "."
    t.push(".".repeat(t[0].length));
    t.splice(0, 0, ".".repeat(t[0].length))
    
    //ajouter 2 colonne, début et fin avec "."
    t = t.map(x => "." + x + ".");
    
    // ces ajouts permettent facilement de checker tout autour des points sans gérer les bords
    for (let row = 1; row < t.length-1; row++) {
        // const element = t[row];
        for (let col = 1; col < t[row].length-1; col++) {
            if (t[row][col] != '@'){
                continue;
            }
            // const element = array[col];
            //check around
            let iAround = 0;
            for (const cDir of Object.values(checkDir)) {         
                if(row == 1 && col == 8){
                    jumpline();
                    stdout(`${cDir[0]} / ${cDir[1]}  ${t[(row + cDir[0])][(col + cDir[1])]}`);
                }
                if (t[(row + cDir[0])][(col + cDir[1])] == '@'){
                    iAround++;
                }
            }
            if (iAround<4){
                result++;
                stdout(`[${row-1};${col-1}] est disponible`);
                jumpline();
            }

            // stdout(`${t[row][col]}`);
        }
        jumpline();
    }
    return result;
}

function part_two(tab) {
    let t = [...tab];
    let result = 0;
    // ajouter une ligne en haut et en bas rempli de "."
    t.push(".".repeat(t[0].length));
    t.splice(0, 0, ".".repeat(t[0].length))

    //ajouter 2 colonne, début et fin avec "."
    t = t.map(x => "." + x + ".");
    iRemain = -1;
    while(iRemain != 0){
        iRemain = 0;
        // ces ajouts permettent facilement de checker tout autour des points sans gérer les bords
        t = t.map(x => x.replaceAll('x', '.'));
        for (let row = 1; row < t.length - 1; row++) {
            // t[row] = t[row].replaceAll('x', '.')
            // const element = t[row];
            for (let col = 1; col < t[row].length - 1; col++) {
                if (t[row][col] == '.') {
                    continue;
                }
                // const element = array[col];
                //check around
                let iAround = 0;
                for (const cDir of Object.values(checkDir)) {
                    if (t[(row + cDir[0])][(col + cDir[1])] != '.') {
                        iAround++;
                    }
                }
                if (iAround < 4) {
                    iRemain++;
                    // t[row] = t[row].split().splice(col,1,'.').join();
                    t[row] = t[row].replaceAt(col,'x');
                    jumpline();
                    stdout(`[${row - 1};${col - 1}] est disponible`);
                }
                // stdout(`${t[row][col]}`);
            }
            jumpline();
        }
        result += iRemain;
        // console.log(`Remain : ${iRemain}`);
        jumpline();
        // console.table(t);
    }
    return result;
}

String.prototype.replaceAt = function (index, replacement){        
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function stdout(sOutput){
    if(!bLog){
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
