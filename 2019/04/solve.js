function solve(intCode, part) {
    let count = 0
    for(let i = 108457; i < 562041; i++){
        if(matchesCriteria(i, part)){
            count++
        }
    }
    return count
}

function matchesCriteria(password, part){
    let matchMap = new Map();
    let pwString = "" + password
    let last = 0
    for(let c of pwString){
        let val = parseInt(c)
        
        if(val < last){
            return false
        }

        if(val == last){
            let mapVal = matchMap.get(val);
            if(mapVal != undefined){
                mapVal++
                matchMap.set(val, mapVal)
            }else{
                matchMap.set(val, 2)
            }
        }
        
        last = val
    }
    
    for(let val of matchMap.values()){
        if(val > 1 && part == 1) return true
        if(val == 2 && part == 2) return true
    }
    
    return false
}

const expected = part => part === 1 ? 2779 : 1972;

function runTests(part){
    var res = true;
    if(part == 1){
        res = matchesCriteria(111111, part) && res
        res = !matchesCriteria(223450, part) && res
        res = !matchesCriteria(123789, part) && res
    }else{
        res = matchesCriteria(112233, part) && res
        res = !matchesCriteria(123444, part) && res
        res = matchesCriteria(111122, part) && res
    }
    console.log('Test success:', res)    
}

module.exports = {solve, expected, runTests};