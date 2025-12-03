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
            let t = data.split(',');
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
    t.forEach(x => {
        let[begID,endId] = x.split('-').map((x)=>{return parseInt(x);});
        // console.log(begID, endId);
        
        for (let idToCheck = begID; idToCheck <= endId; idToCheck++) {
            // console.log('check', idToCheck);
            result += checkValidity(idToCheck.toString());
        }       
    });
    
    return result;
}

function checkValidity(idToCheck){
    //si nombre impair de char, alors valide !
    if (idToCheck.length % 2 != 0){
        return 0;
    }
    let begStr = idToCheck.substring(0, idToCheck.length/2);
    let endStr = idToCheck.substring(idToCheck.length/2);
    
    if (begStr == endStr){
        // console.log(begStr, endStr, '==>', parseInt(idToCheck));
        return parseInt(idToCheck);
    }

    return 0;
}

function part_two(t) {
    let result = 0;
    t.forEach(x => {
        let [begID, endId] = x.split('-').map((x) => { return parseInt(x); });
        // console.log(begID, endId);

        for (let idToCheck = begID; idToCheck <= endId; idToCheck++) {
            // console.log('check', idToCheck);
            result += checkValidityAgain(idToCheck.toString());
        }
    });

    return result;
}

function checkValidityAgain(idToCheck) {
    let leng = idToCheck.length;
    for (let divBy = 1; divBy < leng; divBy++) {
        if (leng % divBy != 0)
            continue;

        let regex = new RegExp('.{1,' + divBy.toString() + '}','g')
        // let regex = '/.{1,' + divBy.toString() + '}/g';
        // console.log(regex);
        
        // console.log(idToCheck.match(regex));
        let oCpt = {};
        idToCheck.match(regex).forEach(x => {
            if (!oCpt[x]){
                oCpt[x] = 0;
            }
            oCpt[x]++;
        })
        // console.log(oCpt);
        if(Object.keys(oCpt).length == 1){            
            if (Object.values(oCpt)[0] >1){
                return parseInt(idToCheck);
            }
        }
    }
    
    return 0;
}
main();
