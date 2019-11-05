const {readFileSync, writeFileSync} = require('fs');
const RegExpForLineComment = /\/\/.*?$/gm;
const RegExpForBlockComment = /\/\*([\s\S]*?)\*\//gm;
const RegExpForEmptyLine = /\n(\n)*( )*(\n)*\n/gm;
let tags = ['\'', '"', '`'],
    res;


const arrHandler = arr => {//Обьединяем массив и выносим его в начало массива
    let [a = [], ...b] = arr;
    b = b.join('')
        .replace(RegExpForBlockComment, '')
        .replace(RegExpForLineComment, '')
        .replace(RegExpForEmptyLine, '\n');
    return [[...a, b].join('')];
};

const removeComments = code => {
    const length = code.length; //определяем к-во символов в коде
    let parsedStrArr = [],
        i;
    for (i = 0; i < length; i++) {
        parsedStrArr.push(code[i]);
        if (tags.includes(code[i])) {//на случай цытат
            let tag = code[i];
            let start = i;
            parsedStrArr = arrHandler(parsedStrArr);
            while (true) {//находим конец кавычек и добавляем их в начало массива
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
    return res = arrHandler(parsedStrArr).join('').slice(0, length);
};
const code = readFileSync('./removeCommentsFromDOM.js', 'utf-8'); //первым аргументом передаем путь к файлу JavaScript, с которого нужно удалить коментарии
writeFileSync('clear.js', removeComments(code));