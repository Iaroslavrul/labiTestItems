const {readFileSync, writeFileSync} = require('fs');
const RegExpForLineComment = /\/\/.*?$/gm;
const RegExpForBlockComment = /\/\*([\s\S]*?)\*\//gm;
const RegExpForEmptyLine = /\n(\n)*( )*(\n)*\n/gm;
let tags = ['\'', '"', '`'],
    res;


const arrHandler = arr => {
    let [a = [], ...b] = arr;
    arr = b.join('')
        .replace(RegExpForBlockComment, '')
        .replace(RegExpForLineComment, '')
        .replace(RegExpForEmptyLine, '\n');
    return [[...a, arr].join('')];
};

const removeComments = code => {
    code = '\n' + code;
    const length = code.length;
    let parsedStrArr = [];
    for (let i = 0; i < length; i++) {
        parsedStrArr.push(code[i]);
        if (tags.includes(code[i])) {
            let tag = code[i];
            let start = i;
            parsedStrArr = arrHandler(parsedStrArr);
            while (true) {
                start++;
                parsedStrArr.push(code[start]);
                if (code[start] === tag) {
                    parsedStrArr = [parsedStrArr.join('')];
                    i = start;
                    break;
                }
            }
        }
    }
    return res = arrHandler(parsedStrArr).join('').slice(1, length);
};
const code = readFileSync('./removeCommentsFromDOM.js', 'utf-8');
writeFileSync('clear.js', removeComments(code));