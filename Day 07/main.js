const tools = require('../General/tools');

let bLog = true; let sFileInput = 'input';
bLog = false;
// sFileInput = 'input_test';

function main() {
    tools.readFileSync(require('path').resolve(__dirname, sFileInput))
        .then((data) => { 
            let t = data.split('\r\n');
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
    let indexS = t[0].indexOf('S');
    let oBeams = {};
    oBeams[indexS] = false;
    logTables(oBeams);
    for (let row = 1; row < t.length; row++) {
        let tBeamDeflector = locations('^',t[row]);
        
        let oNextBeam = {};
        for (const beamDeflector of tBeamDeflector) {
            if (oBeams[beamDeflector] != undefined){
                result++;
                oBeams[beamDeflector] = true;
                oNextBeam[(beamDeflector-1)] = false;
                oNextBeam[(beamDeflector+1)] = false;
            }
        }
        //ajouter les rayons non stoppés
        for (const [key, val] of Object.entries(oBeams)) {
            if (!val){
                oNextBeam[key] = false;
            }
        }
        oBeams = JSON.parse(JSON.stringify(oNextBeam));
    }
    return result;
}

function part_two(t) {
    let result = 0;
    let indexS = t[0].indexOf('S');
    let oBeams = {};
    oBeams[indexS] = { nbBeam:1,stopped:false};
    logTables(oBeams);
    for (let row = 1; row < t.length; row++) {
        let tBeamDeflector = locations('^',t[row]);
        let oNextBeam = {};
        
        for (const beamDeflector of tBeamDeflector) {
            if (oBeams[beamDeflector] != undefined){
                oBeams[beamDeflector].stopped = true;
                if (!oNextBeam[(beamDeflector - 1)]){
                    oNextBeam[(beamDeflector - 1)] = { nbBeam: 0, stopped: false };
                }
                if (!oNextBeam[(beamDeflector + 1)]) {
                    oNextBeam[(beamDeflector + 1)] = { nbBeam: 0, stopped: false };
                }
                oNextBeam[(beamDeflector - 1)].nbBeam += oBeams[beamDeflector].nbBeam;
                oNextBeam[(beamDeflector + 1)].nbBeam += oBeams[beamDeflector].nbBeam;
            }
        }
        //ajouter les rayons non stoppés
        for (const [key, val] of Object.entries(oBeams)) {
            if(val.stopped){
                // result+=val.nbBeam;
            }
            // if (val == 0){
            else {
                if (oNextBeam[key]){
                    oNextBeam[key].nbBeam+=val.nbBeam;
                } else {
                    oNextBeam[key] = val
                }
                //  = val;
            }
        }
        oBeams = JSON.parse(JSON.stringify(oNextBeam));
        // logTables(oBeams);

        stdoutl(`Row: ${row+1}: ${t[row]}`);
        stdoutl(`${Object.entries(oBeams).map(x => { return `[${x[0]}:${x[1].nbBeam}]`; }) }`);
        if (row == t.length - 1) {
            for (const val of Object.values(oNextBeam)) {
                result += val.nbBeam;
            }
        }
    }
    return result;
}

function locations(substring, string) {
    var a = [], i = -1;
    while ((i = string.indexOf(substring, i + 1)) >= 0) a.push(i);
    return a;
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
