function solve(input, part) {
    let sum = 0;
    for(let mass of input){
        let temp = getFuelForMass(mass);
        sum += temp;
        if(part == 1) continue;
        for(;;){
            temp = getFuelForMass(temp);
            if(temp > 0){
                sum += temp;
            }else{
                break;
            }
        }
    }
    return sum;
}

function getFuelForMass(mass){
    let fuel = mass;
    fuel = fuel / 3;
    fuel = Math.floor(fuel);
    fuel = fuel - 2;
    return fuel;
}

const expected = part => part === 1 ? 3159380 : 4736213;

function runTests(part){
    res = true;
    if(part == 1){
        solve([12], part) == 2 && res
        solve([14], part) == 2 && res
        solve([1969], part) == 654 && res
        solve([100756], part) == 33583 && res
    }else{
        solve([12], part) == 2 && res
        solve([1969], part) == 966 && res
        solve([100756], part) == 50346 && res
    }
    console.log('Test success:', res)    
}

module.exports = {solve, expected, runTests};