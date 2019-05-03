import { NUMBERS,OPERATOR,CLEAR,EQUAL, DECIMAL } from "./actionTypes";

export const numbers=content=>({
    type:NUMBERS,
    payload:{
        content
    }
});

export const operator=content=>({
    type:OPERATOR,
    payload:{
        content
    }
});

export const decimal=content=>({
    type:DECIMAL,
    payload:{
        content
    }
});

export const clear=content=>({
    type:CLEAR,
    payload:{
        content
    }
});

export const equal=content=>({
    type:EQUAL,
    payload:{
        content
    }
});