import { NUMBERS,OPERATOR,DECIMAL,EQUAL,CLEAR } from '../actionTypes';

const initialState={
    number:[0],
    formula:[]
};

export default function(state=initialState,action){
    switch(action.type){
        case NUMBERS:{
            const {content}=action.payload;
            const formulaArray=[...state.formula];
            let num ,formulaArr;
            if (!formulaArray.join('').match(/=/)){
                num=(state.number[0].toString().match(/[+\-*\/]/))?
                    Number([content].join('')):
                    ((state.number[0].toString().match(/[\.]/))?[...state.number,content].join(''):Number([...state.number,content].join('')));
                const endPos=state.formula.length;
                formulaArr=(endPos!=0)?
                    ((formulaArray[endPos-1].toString().match(/[0-9]/))?formulaArray.slice(0,endPos-1):formulaArray.slice(0)):
                    [];
            }else{
                num=Number([content].join(''));
                formulaArr=[];
            }
                console.log(state);
            //const formulaArr=state.formula.slice(0,endPos);
            return {
                number:[num],
                formula:[...formulaArr,num]
            };
        }
        case OPERATOR:{
            console.log("inside operator");
            const {content}=action.payload;
            const formulaArray=[...state.formula];
            let formulaArr;
            if (!formulaArray.join('').match(/=/)){
                console.log("yes");
                const endPos=state.formula.length;
                formulaArr=(endPos!=0)?
                    ((formulaArray[endPos-1].toString().match(/[+\-*\/]/))?formulaArray.slice(0,endPos-1):formulaArray.slice(0)):
                    [];
            }else{
                console.log("no");
                formulaArr=[...state.number];
            }
            console.log([...formulaArr,content]);
            return {
                number:[content],
                formula:[...formulaArr,content]
            };
        }
        case DECIMAL:{
            console.log("inside decimal");
            const { content }=action.payload;
            const formulaArray=[...state.formula];
            let newNum ,formulaArr;
            if (!formulaArray.join('').match(/=/)){
                const num=state.number;
                newNum=(!num.join('').match(/[\.]/))?
                    (num.join('').match(/[0-9]/)?[...num,content].join(''):'0.'):
                    num.join('');
                const endPos=state.formula.length;
                formulaArr=(endPos!=0)?
                    ((formulaArray[endPos-1].toString().match(/[+\-*\/]/))?
                    formulaArray.slice(0):
                    formulaArray.slice(0,endPos-1)):[];
            }else{
                newNum='0.';
                formulaArr=[];
            }
            console.log(state);
            console.log(newNum,[...formulaArr]);
            return{
                number:[newNum],
                formula:[...formulaArr,newNum]
            };
        }
        case CLEAR:{
            return initialState;
        }
        case EQUAL:{
            console.log('inside equal');
            const formulaArray=[...state.formula]; 
            const endPos=state.formula.length;
            console.log(!formulaArray.join('').match(/[0-9]/));
            if(!formulaArray.join('').match(/[0-9]/)){
                console.log(1);
                let num=NaN;
                const result='=NaN';
                return {number:[num],formula:[result]};
            }else if(formulaArray.join('').match(/^[*\/][0-9]/)||formulaArray.join('').match(/=/)){
                console.log(2);
                return state;
            }else if(formulaArray[endPos-1].toString().match(/[+\-*\/]/)){
                console.log(3);
                const formulaArr=formulaArray.slice(0,endPos-1);
                let num=eval(formulaArr.join(''));
                num=((num+'.').split('.')[1].length>10)?num.toFixed(10):num;
                const result='='+num;
                return {number:[num],formula:[...formulaArr,result]};
            }else{
                console.log(4);
                console.log(formulaArray.join(''));
                let num=eval(formulaArray.join(''));
                num=((num+'.').split('.')[1].length>10)?num.toFixed(10):num;
                const result='='+num;
                return {number:[num],formula:[...formulaArray,result]};
            }
        }
        default:
            return state;
    }
}