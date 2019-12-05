const readline = require('readline-sync')

function solve(intCode, part) {
    if(part == 1){
        let memInput = intCode[0].split(',').map(val => parseInt(val))
        let result = runMachine(memInput, 1);
        console.log(result[1]);
        return result[1];
    }else{
        let memInput = intCode[0].split(',').map(val => parseInt(val))
        let result = runMachine(memInput, 5);
        console.log(result[1]);
        return result[1];
    }
}

function runMachine(memory, diagCode){
    let out;
    let instructionPtr = 0;
    let instruction = memory[instructionPtr];
    let op = parseInt(instruction.toString().slice(-2))

    while(op != 99){
        //Find the params
        let paramCount;
        switch(op){
            case 1:
            case 2:
            case 7:
            case 8:
                paramCount = 3
                break;
            case 3:
            case 4:
                paramCount = 1;
                break;
            case 5:
            case 6:
                paramCount = 2;
                break;
        }

        let paramModes = instruction.toString().slice(0, -2);
        paramModes = paramModes.padStart(paramCount, '0').split('').reverse()
        let params = []
        for(let i = 0; i < paramCount; i++){
            let paramMode = parseInt(paramModes[i]);
            let paramVal;
            let valPos = instructionPtr + 1 + i
            let memoryVal = memory[valPos]
            
            if(paramMode === 0){
                paramVal = memoryVal
            }else{
                paramVal = valPos
            }
            params.push(paramVal)
        }
        
        instructionPtr = instructionPtr + paramCount + 1;

        let output;
        let p1;
        let p2;
        switch(op){
            case 1: //ADD
                p1 = memory[params[0]]
                p2 = memory[params[1]]
                output = p1 + p2
                memory[params[2]] = output
                break;
            case 2: //MULTIPLY
                p1 = memory[params[0]]
                p2 = memory[params[1]]
                output = p1 * p2
                memory[params[2]] = output
                break;
            case 3: //INPUT
                memory[params[0]] = diagCode
                break;
            case 4: //OUTPUT
                out = memory[params[0]]
                console.log(`OUTPUT: `, out);
                // if(out !== 0) return [memory, out]
                break;
            case 5: //JUMP-IF-TRUE
                p1 = memory[params[0]]
                p2 = memory[params[1]]
                if(p1 !== 0){
                    instructionPtr = p2;
                }
                break;
            case 6: //JUMP-IF-FALSE
                p1 = memory[params[0]]
                p2 = memory[params[1]]
                if(p1 === 0){
                    instructionPtr = p2;
                }
                break;
            case 7: //LESS-THAN
                p1 = memory[params[0]]
                p2 = memory[params[1]]
                if(p1 < p2){
                    memory[params[2]] = 1
                }else{
                    memory[params[2]] = 0
                }
                break;
            case 8: //EQUALS
                p1 = memory[params[0]]
                p2 = memory[params[1]]
                if(p1 === p2){
                    memory[params[2]] = 1
                }else{
                    memory[params[2]] = 0
                }
                break;
            default:
                console.log("Unsupported operation", op)
                return;
        }
        instruction = memory[instructionPtr];
        op = parseInt(instruction.toString().slice(-2))
    }
    return [memory, out]
}

const expected = part => part === 1 ? 11193703 : 12410607;

function runTests(part){
    return;
    var res = true;
    if(part == 1){
        let m1 = [1002,4,3,4,33]
        let machine = runMachine(m1)
        res = arraysEqual(machine[0], [1002,4,3,4,99]) && res
        // let m2 = [3,0,4,0,99]
        // let machine2 = runMachine(m2)
        // console.log(machine2[1])
    }else{
    }
    console.log('Test success:', res)    
}

module.exports = {solve, expected, runTests};


//Helper method, from SO
//https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }