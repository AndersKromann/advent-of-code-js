let chalk = require('chalk');
let fs = require('fs');

let year = 2019;
let startDay = 1;
let endDay = 25;
let args = process.argv.slice(2);

for(let arg of args){
    let n = Number(arg);
    if (n > 2000) {
        year = n
    } else if( n > 0){
        startDay = n;
        endDay = n;
    }
}

for (let day = startDay; day <= endDay; day++){
    let path = `./${year}/${("0" + day).slice(-2)}`;
    if (!fs.existsSync(path)){
        console.log(chalk.red(`${year} day ${day} not found`));
        break;
    }
    let text = fs.readFileSync(path + `/input.txt`)
        .toString()
        .split('\n')
        .map(s => s.replace(/\r$/, ''))
        .filter(s => s.length > 0);

    let solver = require(path + `/solve`);
    for(let part of [1,2]){
        let answer = solver.solve(text, part);
        let expected = solver.expected(part);
        if (answer === expected) {
            console.log(chalk.green(`${year} day ${day} part ${part}: ${answer}`));
        }
        else {
            console.log(chalk.red(`${year} day ${day} part ${part}: ${answer} - expected ${expected}`));
        }
    }
}