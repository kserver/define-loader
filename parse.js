"use strict";

function parse(source,defs){
    if(!defs) defs = {};

    const lines = source.split('\n');
    const listVarName = '__$list$__';
    let code = `(function(){
const ${listVarName} = [];\n`;
    for(let key of Object.keys(defs)){
        code += `const ${key} = ${JSON.stringify(defs[key])};\n`;
    }
    for(let line of lines){
        const checkResult = checkLine(line);
        if(checkResult){
            switch(checkResult.condition){
                case 'if':
                    code += `if(${checkResult.expr}){\n`;
                    break;
                case 'else':
                    code += '}else{\n';
                    break;
                case 'elif':
                    code += `}else if(${checkResult.expr}){\n`;
                    break;
                case 'endif':
                    code += '}\n';
                    break;
            }
        }else{
            code += `${listVarName}.push(${JSON.stringify(line)});\n`
        }
    }
    code += `return ${listVarName};
})();`;

    try{
        const result = eval(code);
        return result.join('\n');
    }catch(e){
        throw new Error('error condition');
    }
}


function checkLine(line){
    const matchResult = line.match(/\/{3,}[\s]*#(if|else|elif|endif)([\s]+[\s\S]*)?$/);
    
    if(matchResult){
        const checkResult = {condition:matchResult[1],expr:(matchResult[2]||'').trim()};
        if(
            (checkResult.condition==='if'||checkResult.condition==='elif')
            &&
            checkResult.expr===''
            ){
                return false;
        }
        return checkResult;
    }
    
    return false;
}

module.exports = parse;
