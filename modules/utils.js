const fs = require("fs");

const sleep = ms => new Promise(r => setTimeout(r, ms));
const rand = (a,b)=>Math.floor(Math.random()*(b-a+1))+a;

function loadJSON(path, def={}) {
    return fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : def;
}

function saveJSON(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function log(text) {
    console.log(text);
    fs.appendFileSync("data/logs.txt", text + "\n");
}

module.exports = { sleep, rand, loadJSON, saveJSON, log };
