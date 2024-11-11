const fs = require("node:fs");
const { program } = require('commander');

program
    .option('-i, --input <path>', 'input a .json file; the option is mandatory')
    .option('-o, --output <path>')
    .option('-d, --display');

program.parse();

const options = program.opts();

if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

let data;
try {
    data = fs.readFileSync(options.input, 'utf8');
} catch (error) {
    console.error('Cannot find input file');
    process.exit(1);
}

let jsonData;
jsonData = JSON.parse(data);
const result = jsonData.map(entry => `${entry.exchangedate}:${entry.rate}`).join('\n');


if (options.output) {
    try {
        fs.writeFileSync(options.output, result, 'utf8');
    } catch (error) {
        console.error('Cannot write to output file');
        process.exit(1);
    }
}

if (options.display) {
    console.log(result);
}