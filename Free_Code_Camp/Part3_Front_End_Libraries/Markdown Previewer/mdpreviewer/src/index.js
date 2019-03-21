import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    }
    mark(){
        var md=marked(this.state.input);
        return {__html:md};
    }
    handleChange(event){
        this.setState({
            input:event.target.value
        }
        );
        
    }
    /*why add () after function mark but not handleChange 
    problem with + - 
    */
    render() {
        return (
            <div id="area">
                <textarea id="editor" onChange={this.handleChange} value={this.state.input} />
                <div id="preview" dangerouslySetInnerHTML={this.mark()} /> 
            </div>
        );
    }
}

ReactDOM.render(
    <MdPreviewer />,
    document.getElementById('root')
);