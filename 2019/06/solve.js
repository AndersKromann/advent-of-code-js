function solve(input, part) {
    let map = createMap(input)
    if(part === 1){
        let orbitCount = getOrbits(map);
        return orbitCount
    }else{
        let transferCount = findYOUtoSAN(map);
        return transferCount
    }
}

function createMap(input){
    let map = new Map();
    for(let orbit of input){
        let planets = orbit.split(')');
        map.set(planets[1], planets[0])
    }
    return map;
}

function getOrbits(map){
    let count = 0;
    for(let [key, value] of map){
        let planetToOrbit = value;
        while(planetToOrbit !== undefined){
            count++;
            planetToOrbit = map.get(planetToOrbit)
        }
    }
    return count;
}

function findYOUtoSAN(map){
    let planetToOrbit = map.get("SAN");
    let sanOrbits = []
    while(planetToOrbit !== undefined){
        sanOrbits.push(planetToOrbit)
        planetToOrbit = map.get(planetToOrbit)
    }
    let commonPlanet;
    planetToOrbit = map.get("YOU");
    while(commonPlanet === undefined){
        if(sanOrbits.includes(planetToOrbit)){
            commonPlanet = planetToOrbit
        }
        planetToOrbit = map.get(planetToOrbit)
    }
    return getOrbitTransfers(map, "YOU", commonPlanet) + getOrbitTransfers(map, "SAN", commonPlanet)
}

function getOrbitTransfers(map, from, to){
    let count = 0;
    let planetToOrbit = map.get(from);
    while(planetToOrbit !== to){
        count++;
        from = planetToOrbit
        planetToOrbit = map.get(planetToOrbit)
    }
    return count;
}

const expected = part => part === 1 ? 387356 : 532;

function runTests(part){
    var res = true;
    if(part == 1){
        let input = ["COM)B", "B)C", "C)D", "D)E", "E)F", "B)G", "G)H", "D)I", "E)J", "J)K", "K)L"]
        let map = createMap(input);
        res = getOrbits(map) === 42 && res
    }else{
        let input = ["COM)B", "B)C", "C)D", "D)E", "E)F", "B)G", "G)H", "D)I", "E)J", "J)K", "K)L", "K)YOU", "I)SAN"]
        let map = createMap(input);
        res = findYOUtoSAN(map) === 4 && res
    }
    console.log('Test success:', res)    
}

module.exports = {solve, expected, runTests};