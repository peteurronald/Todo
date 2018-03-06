import React from "react";
import moment from "moment";
import styled from 'styled-components';

class Timebox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            elapsed: 0,
            remaining: this.props.end - this.props.start
        };
        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        let days = 0;
    }
    componentDidMount = () => {

        // componentDidMount is called by react when the component 
        // has been rendered on the page. We can set the interval here:

        this.timer = setInterval(this.tick, 1000);
    }
    componentWillUnmount = () => {

        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:

        clearInterval(this.timer);
    }
    calcTimeParts = (timeDiff) => {
        // strip the ms
        timeDiff /= 1000;

        // get seconds (Original had 'round' which incorrectly counts 0:28, 0:29, 1:30 ... 1:59, 1:0)
        this.seconds = Math.round(timeDiff % 60);

        // remove seconds from the date
        timeDiff = Math.floor(timeDiff / 60);

        // get minutes
        this.minutes = Math.round(timeDiff % 60);

        // remove minutes from the date
        timeDiff = Math.floor(timeDiff / 60);

        // get hours
        this.hours = Math.round(timeDiff % 24);

        // remove hours from the date
        timeDiff = Math.floor(timeDiff / 24);

        // the rest of timeDiff is number of days
        this.days = timeDiff ;
    }
    tick = () => {

        // This function is called every 1000 ms. It updates the 
        // elapsed counter. Calling setState causes the component to be re-rendered

        // let elapsed = new Date() - this.props.start;
        // this.calcTimeParts(elapsed);
        // this.setState({elapsed});

        let remaining = this.state.remaining
        this.calcTimeParts(remaining);
        this.setState({remaining: remaining - 1000});

    }
    getElapsedFormatted = () => {
        let op =  this.days > 0? `${this.days} days `:``;
            op +=   this.hours > 0 ? `${this.hours} hours `:``;
            op +=   this.minutes > 0 ? `${this.minutes} minutes `:``;
            op +=   this.seconds > 0 ? `${this.seconds} secs`:``;
        return op;
    }
    getRemainingFormatted = () => {
        let op =  this.days > 0? `${this.days} days `:``;
            op +=   this.hours > 0 ? `${this.hours} hours `:``;
            op +=   this.minutes > 0 ? `${this.minutes} minutes `:``;
            op +=   this.seconds > 0 ? `${this.seconds} secs`:``;
        return op;
    }
    render() {

        var elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);

        return ( 
        <div>
            <Box>
                <BoxSpan>Started: {moment(this.props.time).format('MMMM Do YYYY, h:mm')}</BoxSpan>
                {/* <BoxSpan>Time Elapsed: { `${this.hours} days ${this.hours} hours ${this.minutes} mins ${this.seconds} secs`}</BoxSpan> */}
                {/* <BoxSpan>Elapsed: {this.getElapsedFormatted()}</BoxSpan> */}
                <BoxSpan>Remaining: {this.getRemainingFormatted()}</BoxSpan>
            </Box>
        </div>
      );
    }
}

const Box = styled.div`
    display: flex;
    flex-direction:column;
    font-weight:bold;
`;

const BoxSpan = styled.span`
    height: 15px;
`;

 
export default Timebox;

