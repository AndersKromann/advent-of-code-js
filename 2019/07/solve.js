function solve(intCode, part) {
    let input = intCode[0].split(',').map(val => parseInt(val));
    if(part == 1){
        let phaseInputs = getAllPermutations('01234')
        return findLargestOutput(input, phaseInputs);
    }else{
        let phaseInputs = getAllPermutations('56789')
    }
}

function findLargestOutput(intcode, phaseInputs){
    let result = 0;
    for(let ps of phaseInputs){
        let res = runAmplifierChain(intcode, ps)
        if(res > result) result = res;
    }
    return result;
}

function runMachine(memory, inputs){
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
                memory[params[0]] = inputs.shift()
                break;
            case 4: //OUTPUT
                out = memory[params[0]]
                //console.log(`OUTPUT: `, out);
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

function runAmplifierChain(intcode, phaseSequence){
    let lastOut = 0;

    for(let i = 0; i < 5; i++){
        let phase = parseInt(phaseSequence[i])
        let ampResult = runMachine([...intcode], [phase, lastOut])
        lastOut = parseInt(ampResult[1])
    }
    return lastOut
}

function getAllPermutations(string) {
    var results = [];
  
    if (string.length === 1) {
      results.push(string);
      return results;
    }
  
    for (var i = 0; i < string.length; i++) {
      var firstChar = string[i];
      var charsLeft = string.substring(0, i) + string.substring(i + 1);
      var innerPermutations = getAllPermutations(charsLeft);
      for (var j = 0; j < innerPermutations.length; j++) {
        results.push(firstChar + innerPermutations[j]);
      }
    }
    return results;
}

const expected = part => part === 1 ? 262086 : -1;

function runTests(part){
    return;
    var res = true;
    if(part == 1){
        let m1 = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]
        let ps1 = [4,3,2,1,0]
        res = runAmplifierChain(m1, ps1) === 43210 && res
        let m2 = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0]
        let ps2 = [0,1,2,3,4]
        res = findLargestOutput(m2) === 54321 && res
    }else{
    }
    console.log('Test success:', res)    
}

module.exports = {solve, expected, runTests};