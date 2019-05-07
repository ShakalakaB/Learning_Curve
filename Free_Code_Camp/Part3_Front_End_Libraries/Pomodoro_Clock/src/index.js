import React from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fontawesome';

import './index.scss';

const projectName='React Pomodoro Clock';
localStorage.setItem('Aldora_project_FCC','React Pomodoro Clock');

let seconds=0;
let timeInterval,sound;
class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state={
            breakLength:5,
            sessionLength:25,
            timeLeft:'',
            start:false,
            mode:true
        }
        this.timeSet=this.timeSet.bind(this);
        this.startStop=this.startStop.bind(this);
        this.tick=this.tick.bind(this);
        this.timeCal=this.timeCal.bind(this);
        this.decrement=this.decrement.bind(this);
        this.increment=this.increment.bind(this);
        this.reset=this.reset.bind(this);
        this.audio=new Audio("https://goo.gl/65cBl1");
    }
    componentDidMount(){
        this.timeSet();
        sound=document.getElementById('beep');
    }
    timeSet(){
        let iniPoint=this.state.mode?this.state.sessionLength:this.state.breakLength;
        this.setState({
            timeLeft:iniPoint+':00'
        });
    }
    timeCal(_timeLen,_seconds){
        let min=Math.floor((_timeLen*60-_seconds)/60);
        min=min<10?('0'+min):min;
        let sec=(_seconds%60==0)?0:(60-_seconds%60);
        sec=sec<10?('0'+sec):sec;
        return min+':'+sec;
    }
    tick(){
        timeInterval=setInterval(()=>{
            let timeLen=this.state.mode?this.state.sessionLength:this.state.breakLength;
            this.setState({
            timeLeft:this.timeCal(timeLen,seconds)
        });
        setTimeout(()=>{
            if (this.state.timeLeft=="00:00"){
                this.setState({mode:!this.state.mode});
                seconds=0;
                sound.play();
            }},1);
        seconds++;
    },1000);
    }
    startStop(){
        this.setState({start:!this.state.start});
        if (!this.state.start){
            this.tick();
        }else{
            clearInterval(timeInterval);
        }
    }
    decrement(event){
        if(!this.state.start){
            if (/(break)/.test(event.currentTarget.id)){
                if(this.state.breakLength>1 && this.state.breakLength<61){
                    this.setState({breakLength:this.state.breakLength-1});
                    setTimeout(()=>this.timeSet(),1);
                }
            }else{
                if (this.state.sessionLength>1 && this.state.sessionLength<61){
                    this.setState({sessionLength:this.state.sessionLength-1});
                    setTimeout(()=>this.timeSet(),1);
                }
            }
        }
    }
    increment(event){
        if(!this.state.start){
            if (/(break)/.test(event.currentTarget.id)){
                if(this.state.breakLength>0 && this.state.breakLength<60){
                    this.setState({breakLength:this.state.breakLength+1});
                    setTimeout(()=>this.timeSet(),1);
                }
            }else{
                if (this.state.sessionLength>0 && this.state.sessionLength<60){
                    this.setState({sessionLength:this.state.sessionLength+1});
                    setTimeout(()=>this.timeSet(),1);
                }
            }
        }
    }
    reset(){
        sound.currentTime=0;
        clearInterval(timeInterval);
        this.setState({
            breakLength:5,
            sessionLength:25,
            timeLeft:'25:00',
            start:false,
            mode:true
        });
    }
    render(){
        return(
            <div id="clock">
                <div id="title">Pomodoro Clock</div>
                <div id="break">
                    <div id="break-label">Break Length</div>
                    <div id="break-box">
                        <div id="break-decrement" className="select" onClick={this.decrement} title="Decrement Break">
                            <FontAwesomeIcon icon="arrow-down" size="sm"/>
                        </div>
                        <div id="break-increment" className="select" onClick={this.increment} title="Increment Break">
                            <FontAwesomeIcon icon="arrow-up" size="sm"/>
                        </div>
                        <div id="break-length">{ this.state.breakLength }</div>
                    </div>
                </div>
                <div id="session">
                    <div id="session-label">Session Length</div>
                    <div id="session-box">
                        <div id="session-decrement" className="select" onClick={this.decrement} title="Decrement Session">
                            <FontAwesomeIcon icon="arrow-down" size="sm"/>
                        </div>
                        <div id="session-increment" className="select" onClick={this.increment} title="Increment Session">
                            <FontAwesomeIcon icon="arrow-up" size="sm"/>
                        </div>
                        <div id="session-length">{ this.state.sessionLength }</div>
                    </div>
                </div>
                <div id="timer">
                    <div id="timer-label">
                        <audio id="beep" src="https://goo.gl/65cBl1"></audio>
                        {this.state.mode?'Session':'Break'}
                    </div>
                    <div id="time-left" style={/^00/.test(this.state.timeLeft)?{color:'#ea466b'}:{color:'#d3e1ea'}}>
                        <div id="first">{ this.state.timeLeft.split('')[0] } </div>
                        <div id="second">{ this.state.timeLeft.split('')[1] }</div>
                        <div id="colon">{ this.state.timeLeft.split('')[2] }</div>
                        <div id="third">{ this.state.timeLeft.split('')[3] }</div>
                        <div id ="fourth">{ this.state.timeLeft.split('')[4] }</div>
                    </div>
                    <div id="control">
                        <div id="start_stop" className="select" onClick={this.startStop}>
                            {this.state.start?(
                                    <FontAwesomeIcon icon="pause" size="lg"/>
                                ):(
                                    <FontAwesomeIcon icon="play" size="lg"/>
                                )}
                        </div>
                        <div id="reset" className="select" title="Reset" onClick={this.reset}>
                            <FontAwesomeIcon icon="sync-alt" size="lg"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);

module.hot.accept();
