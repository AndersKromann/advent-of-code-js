function solve(input, part) {
    let line1 = input[0].split(',');
    let line2 = input[1].split(',');
    if(part == 1){
        return solvePartOne(line1, line2);
    }else{
        return solvePartTwo(line1, line2);
    }
}

function solvePartOne(l1, l2){
    var visMap = getVisitedMap(l1);
    var intersections = findIntersections(visMap, l2);
    var closest = getClosestManhattan(intersections);
    return closest;
}

function solvePartTwo(l1, l2){
    var visMap = getVisitedMap(l1);
    var intersections = findIntersections(visMap, l2);
    var fewestSteps = getLowestSteps(intersections);
    return fewestSteps;
}

function getVisitedMap(line){
    let gridMap = new Map();
    let currentX = 0;
    let currentY = 0;
    let steps = 0;
    line.forEach(instruction => {
        let dir = instruction.slice(0, 1);
        let count = parseInt(instruction.slice(1));
        switch(dir){
            case 'R':
                for(let i = 0; i < count; i++){
                    currentX++;
                    steps++;
                    gridMap.set(`${currentX},${currentY}`, steps)
                }
                break;
            case 'L':
                for(let i = 0; i < count; i++){
                    currentX--;
                    steps++;
                    gridMap.set(`${currentX},${currentY}`, steps)
                }
                break;
            case 'U':
                for(let i = 0; i < count; i++){
                    currentY++;
                    steps++;
                    gridMap.set(`${currentX},${currentY}`, steps)
                }
                break;
            case 'D':
                for(let i = 0; i < count; i++){
                    currentY--;
                    steps++;
                    gridMap.set(`${currentX},${currentY}`, steps)
                }
                break;
        }
    });
    return gridMap;
}

function findIntersections(map, line){
    let intersections = [];
    let currentX = 0;
    let currentY = 0;
    let steps = 0;
    line.forEach(instruction => {
        let dir = instruction.slice(0, 1);
        let count = parseInt(instruction.slice(1));
        switch(dir){
            case 'R':
                for(let i = 0; i < count; i++){
                    currentX++;
                    steps++;
                    if(map.get(`${currentX},${currentY}`) != undefined){
                        let otherLineSteps = map.get(`${currentX},${currentY}`);
                        intersections.push({x: currentX, y: currentY, steps: otherLineSteps + steps})
                    }
                }
                break;
            case 'L':
                for(let i = 0; i < count; i++){
                    currentX--;
                    steps++;                    
                    if(map.get(`${currentX},${currentY}`) != undefined){
                        let otherLineSteps = map.get(`${currentX},${currentY}`);
                        intersections.push({x: currentX, y: currentY, steps: otherLineSteps + steps})
                    }
                }
                break;
            case 'U':
                for(let i = 0; i < count; i++){
                    currentY++;
                    steps++;                    
                    if(map.get(`${currentX},${currentY}`) != undefined){
                        let otherLineSteps = map.get(`${currentX},${currentY}`);
                        intersections.push({x: currentX, y: currentY, steps: otherLineSteps + steps})
                    }
                }
                break;
            case 'D':
                for(let i = 0; i < count; i++){
                    currentY--;
                    steps++;
                    if(map.get(`${currentX},${currentY}`) != undefined){
                        let otherLineSteps = map.get(`${currentX},${currentY}`);
                        intersections.push({x: currentX, y: currentY, steps: otherLineSteps + steps})
                    }
                }
                break;
        }
    })
    return intersections;
}

function getClosestManhattan(intersections){
    let lowest;
    intersections.forEach(intersection => {
        var taxicabDist = Math.abs(intersection.x + intersection.y);
        if(lowest == undefined || taxicabDist < lowest){
            lowest = taxicabDist;
        }
    })
    return lowest
}

function getLowestSteps(intersection){
    let lowest;
    intersection.forEach(intersection => {
        var steps = intersection.steps;
        if(lowest == undefined || steps < lowest){
            lowest = steps;
        }
    })
    return lowest;
}

const expected = part => part === 1 ? 217 : 3454;

function runTests(part){
    var res = true;
    
    if(part == 1){
        var l1 = ['R8', 'U5', 'L5', 'D3'];
        var l2 = ['U7', 'R6', 'D4', 'L4'];
        solvePartOne(l1, l2) == 6 && res
        
        var l1 = ['R75','D30','R83','U83','L12','D49','R71','U7','L72'];
        var l2 = ['U62','R66','U55','R34','D71','R55','D58','R83'];
        solvePartOne(l1, l2) == 159 && res

        var l1 = ['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'];
        var l2 = ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7'];
        solvePartOne(l1, l2) == 135 && res
    }else{
        var l1 = ['R8', 'U5', 'L5', 'D3'];
        var l2 = ['U7', 'R6', 'D4', 'L4'];
        solvePartTwo(l1, l2) == 20 && res
        
        var l1 = ['R75','D30','R83','U83','L12','D49','R71','U7','L72'];
        var l2 = ['U62','R66','U55','R34','D71','R55','D58','R83'];
        solvePartTwo(l1, l2) == 610 && res

        var l1 = ['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'];
        var l2 = ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7'];
        solvePartTwo(l1, l2) == 410 && res
    }

    console.log('Test success:', res)    
}

module.exports = {solve, expected, runTests};