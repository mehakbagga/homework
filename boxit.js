const csvParse = require('csv-parser')
const fs = require('fs')

function drawLine(num) {
    let line = ""
    for (let i = 0; i < num; i++) {
        line += "-"
    }
    return line
}

function drawTopBorder(num) {
    return "\u250C" + drawLine(num) + "\u2510";
}

function drawBottomBorder(num) {
    return "\u2514" + drawLine(num) + "\u2518";
}

function drawMiddleBorder(num) {
    return "|" + drawLine(num) + "|";
}

function drawBarsAround(str, greatest) {
    string = "|" + str;
    if (greatest > str.length) {
        for (let i = 0; i < greatest - str.length; i++) {
            string += " ";
        }
    }
    return string + "|";
}

function returnGreatestLength(messageArr) {
    if (messageArr.length >= 1) {
        let greatest = messageArr[0];
        for (let i = 0; i < messageArr.length; i++) {
            if (messageArr[i].length > greatest.length) {
                greatest = messageArr[i];
            }
        }
        return greatest.length
    }
    else {
        return -1;
    }
}

function boxIt(messageArr) {
    let box = "";
    let greatestLength = returnGreatestLength(messageArr) + 1
    box += drawTopBorder(greatestLength);
    for (let i = 0; i < messageArr.length; i++) {
        if (i != messageArr.length - 1) {
            box += "\n" + drawBarsAround(messageArr[i], greatestLength) + "\n" + drawMiddleBorder(greatestLength);
        } else {
            box += "\n" + drawBarsAround(messageArr[i], greatestLength)
        }  
    }
    box += "\n" + drawBottomBorder(greatestLength);
    return box;
}

console.log(boxIt(process.argv[2]));

function convertCSV(filePath) {
    const namesArr = [];

    fs.createReadStream(filePath).pipe(csvParse()).on('data', function(data) {
        namesArr.push(data.Names);
    });

    return namesArr;
}