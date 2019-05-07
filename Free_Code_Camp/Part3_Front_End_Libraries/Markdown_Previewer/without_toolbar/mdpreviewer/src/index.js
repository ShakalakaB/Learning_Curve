import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import marked from 'marked';

class MdPreviewer extends Component {
    constructor(props){
        super(props);
        this.state={
            input:'    + testd',
            output:""
        }
        this.handleChange=this.handleChange.bind(this);
        this.mark=this.mark.bind(this);
        this.deliver=this.deliver.bind(this);
    }
    mark(){
        let mdInput=marked(this.state.input,{breaks:true});
        return {__html:mdInput};
    }
    handleChange(event){
        this.setState({
            input:event.target.value
        }
        );
       // setTimeout(()=>(console.log(this.state.input)),1000);
    }
    /* deliver() can be used to show html format of input*/
    deliver(){
        let mdInput=marked(this.state.input,{breaks:true});
        return mdInput;
    }

    render() {
        return (
            <div id="area">
                <textarea id="editor" onChange={this.handleChange} value={this.state.input} />
                <div id="preview" dangerouslySetInnerHTML={this.mark()} /> 
            </div>
        );
    }
    /*this is used to debug
    render(){
        return(
            <div id="area">
                <textarea id="editor" class="col-sm-6" onChange={this.handleChange} value={this.state.input} />
                <div class="col-sm-6" id="preview" style={{whiteSpace:"pre-line"}}>{this.deliver()}</div>
            </div>
        );
    };*/

}

ReactDOM.render(
    <MdPreviewer />,
    document.getElementById('root')
);