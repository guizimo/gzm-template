import Scanner from "./scanner";

/**
 * 生成dom字符串
 * @param tokens
 * @param data
 * @returns {string}
 */
export function renderTemplate(tokens, data) {
    let resultStr = '';
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (token[0] === 'text') {
            resultStr += token[1];
        } else if (token[0] === 'name') {
            resultStr += lookup(data, token[1]);
        } else if (token[0] === '#') {
            resultStr += parseArray(token, data);
        }
    }
    return resultStr;
}


/**
 * 将模版字符串变为tokens数组
 * @param templateStr
 */
export function parseTemplateToTokens(templateStr) {
    let tokens = [];
    let scanner = new Scanner(templateStr)
    let words
    while (!scanner.eos()) {
        // 过滤{{}}
        words = scanner.scanUtil('{{')
        if (words !== '') {
            let _words = ''
            let isInHtml = false
            for (let i = 0; i < words.length; i++) {
                if (words[i] === '<') {
                    isInHtml = true
                } else if (words[i] === '>') {
                    isInHtml = false
                }
                if (!/\s/.test(words[i])) {
                    _words += words[i]
                } else {
                    if (isInHtml) {
                        _words += words[i]
                    }
                }
            }
            tokens.push(['text', _words])
        }
        scanner.scan('{{')
        words = scanner.scanUtil('}}')
        if (words !== '') {
            // 此时words为{{}}里面的值
            if (words[0] === '#') {
                tokens.push(['#', words.substring(1)])
            } else if (words[0] === '/') {
                tokens.push(['/', words.substring(1)])
            } else {
                tokens.push(['name', words])
            }
        }
        scanner.scan('}}')
    }
    // 折叠tokens
    return nestTokens(tokens)
}

/**
 * 折叠tokens
 * @param tokens
 */
function nestTokens(tokens) {
    let nestedTokens = []
    let sections = []
    let collector = nestedTokens
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        switch (token[0]) {
            case '#':
                collector.push(token)
                sections.push(token)
                collector = token[2] = []
                break
            case '/':
                sections.pop()
                collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens
                break
            default:
                collector.push(token)
                break
        }
    }
    return nestedTokens
}


/**
 * 在对象中使用.符号
 * @param {object} dataObj
 * @param {string} keyName
 */
function lookup(dataObj, keyName) {
    if (keyName.indexOf('.') !== -1 && keyName !== '.') {
        const keys = keyName.split('.');
        let temp = dataObj;
        for (let i = 0; i < keys.length; i++) {
            temp = temp[keys[i]];
        }
        return temp;
    }
    return dataObj[keyName];
};

/**
 * 处理数组
 * @param token
 * @param data
 * @returns {string}
 */
function parseArray(token, data) {
    let v = lookup(data, token[1])
    let resultStr = ''
    for (let i = 0; i < v.length; i++) {
        resultStr += renderTemplate(token[2], {
            ...v[i],
            '.': v[i]
        })
    }
    return resultStr
}
