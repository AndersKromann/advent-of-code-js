function solve(intCode, part) {
    intCode = intCode[0].split(',').map(s => parseInt(s))
    if(part == 1){
        return runMachine(intCode, 12, 2)[0];
    }else{
        let expOutput = 19690720;
        for(let noun = 0; noun <= 99; noun++){
            for(let verb = 0; verb <= 99; verb++){
                let res = runMachine([...intCode], noun, verb)[0];
                if(res == expOutput){
                    return 100 * noun + verb;
                }
            }
        }
    }    
}

function runMachine(memory, p1, p2){
    memory[1] = p1;
    memory[2] = p2;
    let instructionPtr = 0;
    let op = memory[instructionPtr];
    while(op != 99){
        var n1index = memory[instructionPtr + 1]
        var n2index = memory[instructionPtr + 2];
        var outputIndex = memory[instructionPtr + 3];
        if(op == 1){
            let output = memory[n1index] + memory[n2index]
            memory[outputIndex] = output
        }else{
            let output = memory[n1index] * memory[n2index]
            memory[outputIndex] = output
        }
        instructionPtr = instructionPtr + 4;
        op = memory[instructionPtr];
    }
    return memory
}

const expected = part => part === 1 ? 6627023 : 4019;

function runTests(part){
    var res = true;
    if(part == 1){
        runMachine([1, 0, 0, 0, 99], 0, 0) == [2, 0, 0, 0, 99] && res
        runMachine([2,3,0,3,99], 3, 0) == [2,3,0,6,99] && res
        runMachine([2,4,4,5,99,0], 4, 4) == [2,4,4,5,99,9801] && res
        runMachine([1,1,1,4,99,5,6,0,99], 1, 1) == [30,1,1,4,2,5,6,0,99] && res
    }
    console.log('Test success:', res)    
}

module.exports = {solve, expected, runTests};