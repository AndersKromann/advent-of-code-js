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

module.exports = {solve, expected};