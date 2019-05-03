import React from "react";
import { connect } from "react-redux";
import './index.scss';
import {keys} from './constants.js';
import { numbers,operator,decimal,equal,clear } from "./redux/actions";

class Calculator extends React.Component{
    constructor(props){
        super(props);
        //this.state={}
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(event){
        let key=event.target.id;
        switch(key){
            case 'zero':
            case 'one':
            case 'two':
            case 'three':
            case 'four':
            case 'five':
            case 'six':
            case 'seven':
            case 'eight':
            case 'nine':
                this.props.numbers(keys[key]);
                break;
            case 'add':
            case "subtract":
            case "multiply":
            case "divide":
                this.props.operator(keys[key]);
                break;
            case "decimal":
                this.props.decimal(keys[key]);
                break;
            case "clear":
                this.props.clear(keys[key]);
                break;
            case "equals":
                this.props.equal(keys[key]);
                break;
        }
        //console.log(key);
    }
    render(){
        let keyboard=Object.entries(keys).map(e=>{
            return (
                <div className="grid-item" id={e[0]} key={e[0]} onClick={this.handleClick}>{e[1]}</div> 
            )
        });
        return(
            <div id="calculator">
                <div id="displays">
                    <div id="output">{ this.props.outputNum }</div>
                    <div id="display">{ this.props.inputNum }</div>
                </div>
                <div id="keyboard">
                    {keyboard}
                </div>
            </div>
            /*<div id="test">TEST</div>*/
        );
    }
}
const actionCreators={
    numbers,
    operator,
    decimal,
    equal,
    clear
}
const mapStateToProps=state=>{
    const inputNum=state.input.number[0];
    const outputNum=[...state.input.formula].join('');
    return { outputNum,inputNum };
};
export default connect(
    mapStateToProps,
    actionCreators
)(Calculator);