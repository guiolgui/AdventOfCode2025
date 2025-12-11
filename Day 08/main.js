const tools = require('../General/tools');

let bLog = true; let sFileInput = 'input'; let cLimit = 1000; 
bLog = false;
// sFileInput = 'input_test'; cLimit = 10;

function main() {
    
    tools.readFileSync(require('path').resolve(__dirname, sFileInput))
        .then((data) => { 
            let t = data.split('\r\n').map(x=>x.split(',').map(y=>parseInt(y)));
            // logTables(t);
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
    //tableau de point
    let tPoints = [];
    for (const tt of t) {
        tPoints.push(new Point(tt[0], tt[1], tt[2]));
    }
    
    //pour chaque point, calculer la distance entre chacun
    let oDistance = {};
    for(let i = 0;i<tPoints.length-1;i++){
        //on compare chaque point avec seulement les suivants
        for (let j = i+1; j < tPoints.length; j++) {
            let dist = Point.distance(tPoints[i],tPoints[j]);
            if (!oDistance[dist]){
                oDistance[dist] = [];
            }
            oDistance[dist].push({ 'P1': tPoints[i], 'P2': tPoints[j] });
        }
    }
    // console.log(oDistance);
    // console.table(oDistance);
    // console.log(tPoints[0]);
    let tDistSorted = Object.keys(oDistance).sort((a, z) => a - z);
    // let cpt = 0;
    // let i = 0;
    // while(true){
    let tLen = tPoints.length;
    for (let i = 0; i < cLimit; i++) {
        let P1 = oDistance[tDistSorted[i]][0].P1;
        let P2 = oDistance[tDistSorted[i]][0].P2;
        P1.connectTo(P2,{})
        // cpt += P1.connectTo(P2,{}) ? 1 : 1;
        stdoutl(`${P1} et ${P2} : ${P1.idCircuit}`,`I`)
        if(Point.toBeMerged){
            for (const point of tPoints) {
                if (point.idCircuit == Point.toBeMerged.from){
                    point.idCircuit = Point.toBeMerged.to;
                }
            }
            Point.toBeMerged = undefined;
            Point.nbCircuit--;
        }
        // console.log('Top',i+1,tDistSorted[i]);
        // console.log(oDistance[tDistSorted[i]][0]);
        // if (cpt>=1000)
        //         break;
        // i++;
    }

    logTables(tPoints);

    let oCicruits = {};
    for (const point of tPoints) {
        if(!oCicruits[point.idCircuit]){
            oCicruits[point.idCircuit] = 0;
        } 
        oCicruits[point.idCircuit]++;
    }
    logTables(oCicruits);

    let oProduces = {};
    for (const [key,value] of Object.entries(oCicruits)) {
        if (key == -1){
            continue;
        }
        if (!oProduces[value]) {
            oProduces[value] = 0;
        }
        oProduces[value]++;
    }
    logTables(oProduces);

    result = 1;
    let cpt = 1;
    for (const key of Object.keys(oProduces).sort((a, z) => z - a)) {
        result *= key;
        
        if (++cpt>3)
            break;
    }

    return result;
}

function part_two(t) {
    let result = 0;
    //tableau de point
    Point.clear();
    let tPoints = [];
    for (const tt of t) {
        tPoints.push(new Point(tt[0], tt[1], tt[2]));
    }

    //pour chaque point, calculer la distance entre chacun
    let oDistance = {};
    for (let i = 0; i < tPoints.length - 1; i++) {
        //on compare chaque point avec seulement les suivants
        for (let j = i + 1; j < tPoints.length; j++) {
            let dist = Point.distance(tPoints[i], tPoints[j]);
            if (!oDistance[dist]) {
                oDistance[dist] = [];
            }
            oDistance[dist].push({ 'P1': tPoints[i], 'P2': tPoints[j] });
        }
    }
    
    let tDistSorted = Object.keys(oDistance).sort((a, z) => a - z);
    let i = 0;
    let tLen = tPoints.length;

    stdoutl(`max I ${tDistSorted.length}`, 'I');
    while(true){
        stdoutl(`${i}`,'I')
        let P1 = oDistance[tDistSorted[i]][0].P1;
        let P2 = oDistance[tDistSorted[i]][0].P2;
        P1.connectTo(P2, {})
        // cpt += P1.connectTo(P2,{}) ? 1 : 1;
        stdoutl(`${P1} et ${P2} : ${P1.idCircuit}`, `I`)
        if (Point.toBeMerged) {
            for (const point of tPoints) {
                if (point.idCircuit == Point.toBeMerged.from) {
                    point.idCircuit = Point.toBeMerged.to;
                }
            }
            Point.toBeMerged = undefined;
            Point.nbCircuit--;
        }
        if (tPoints.map(x=>x.idCircuit).indexOf(-1) == -1 && Point.nbCircuit == 1) {
            return P1.x * P2.x;
        }
        i++;
    }
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

function stdoutl(sOutput,type) {
    if (!bLog) {
        return;
    }
    switch (type) {
        case 'E':
            sOutput = colorize('91', sOutput);
            break;
        case 'I':
            sOutput = colorize('93', sOutput);
            break;
        case 'S':
            sOutput = colorize('92', sOutput);
            break;
        default:
            break;
    }
    stdout(sOutput);
    jumpline();
} 

function colorize(color,output) {
    return ['\x1b[',color,'m', output, '\x1b[0m'].join('');
}

class Point{
    static currentId = 0;
    static toBeMerged = undefined;
    static nbCircuit = 0;
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
        // this.connectedTo = {};
        this.idCircuit = -1;
    }
    static clear() {
        this.currentId = 0;
        this.toBeMerged = undefined;
        this.nbCircuit = 0;
    }
    /**
     * @param {Point} a Point a
     * @param {Point} b Point b
     * @returns {number} Distance
     */
    static distance(a,b){
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        return Math.hypot(dx, dy, dz);
    }
    toString(){
        return [this.x,this.y,this.z].join('/');
    }
    get [Symbol.toStringTag]() {
        return `{x:${this.x},y:${this.y},z:${this.z}}`;
    }
    /**
     * @param {Point} a  Point à connecter
     * @param {Object} alrDone Point déjà connecté durant la récursivité
     */
    // connectTo(a,alrDone){
    //     //déjà connecté
    //     if(this.connectedTo[a.toString()]){
    //         return false;
    //     }
    //     if (alrDone[a.toString()]){
    //         return false;
    //     }
    //     this.connectedTo[a.toString()] = a;
    //     a.connectedTo[this.toString()] = this;
    //     alrDone[a.toString()] = '.';
    //     alrDone[this.toString()] = '.';
    //     for (const point of Object.values(this.connectedTo)) {
    //         a.connectTo(point, alrDone);
    //     }
    //     //le faire pour chaque

    //     // return to.connectTo;
    // }
    connectTo(a) {
        //Cas: aucun des points n'a de circuit ==> création d'un
        if (this.idCircuit == -1 && a.idCircuit == -1) {
            stdoutl(`${this.toString()} et ${a}: Nouveau circuit!`, `S`);
            this.idCircuit = a.idCircuit = ++Point.currentId;
            Point.nbCircuit++;
            return true;
        }
        //Cas : les deux points sont déjà connectés :
        if (this.idCircuit == a.idCircuit) {
            stdoutl(`${this.toString()} et ${a} déjà connecté!`,`E`);
            return false;
        }
        //Cas : les deux points sont déjà connectés à d'autre !
        if (this.idCircuit != -1 && a.idCircuit != -1) {
            stdoutl(`${this.toString()} et ${a} déjà connecté à d'autres ${this.idCircuit} et ${a.idCircuit} seront mergés !!`, `E`);
            Point.toBeMerged = { from: a.idCircuit, to: this.idCircuit };
            a.idCircuit = this.idCircuit;
            // Point.toBeMerged[a.idCircuit] = this.idCircuit;
            return false;
        }
        //Cas : un des points a un circuit, on ajoute l'autre
        if (this.idCircuit == -1 ) {
            this.idCircuit = a.idCircuit;
        } else {
            a.idCircuit = this.idCircuit;
        }
        return true;
    }
}


main();
