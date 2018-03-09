import React from "react";
import moment from "moment";
import styled from 'styled-components';

class Timebox extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            remaining: this.props.endDate - moment(),
            status: null,
            statuses: { NOT_STARTED: -1, ACTIVE: 1, FINISHED: 0 },
            boxColor: {color: "blue"}
        };

        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        let days = 0;

    }
    componentDidMount = () => {
        this.timer = setInterval(this.tick, 1000);
    }
    componentWillUnmount = () => {
        clearInterval(this.timer);
    }
    getStatus = () => {
        let status = null;
        let start = this.props.startDate;
        let end = this.props.endDate;
        let now = moment();

        if (now.isBefore(start)) {
            status = this.state.statuses.NOT_STARTED
        } else if (now.isAfter(start) && now.isBefore(end)) {
            status = this.state.statuses.ACTIVE;
        } else if (now.isAfter(end)) {
            status = this.state.statuses.FINISHED;
        }
        return status;

    }
    calcTimeParts = (timeDiff) => {
        // strip the ms
        timeDiff /= 1000;

        this.seconds = Math.round(timeDiff % 60);
        timeDiff = Math.floor(timeDiff / 60);

        this.minutes = Math.round(timeDiff % 60);
        timeDiff = Math.floor(timeDiff / 60);

        this.hours = Math.round(timeDiff % 24);
        timeDiff = Math.floor(timeDiff / 24);

        this.days = timeDiff;
    }
    // This function is called every 1000 ms. It updates the 
    // elapsed counter. Calling setState causes the component to be re-rendered
    tick = () => {

        this.setState({ status: this.getStatus() });
        //console.log(`Status is ${this.state.status}`);

        let isActive = this.state.status === this.state.statuses.ACTIVE;
        let isNotStarted = this.state.status === this.state.statuses.NOT_STARTED;
        if (isActive) {
            this.calcTimeParts(this.state.remaining);
            this.setState({ remaining: this.state.remaining - 1000 });
        } 
       

    }
    getRemainingFormatted = () => {
        let op = this.days > 0 ? `${this.days} days ` : ``;
        op += this.hours > 0 ? `${this.hours} hours ` : ``;
        op += this.minutes > 0 ? `${this.minutes} minutes ` : ``;
        op += this.seconds > 0 ? `${this.seconds} secs` : ``;
        return op;
    }
    render() {
        let start = this.props.startDate.format('MMMM Do YYYY, h:mm');
        let end = this.props.endDate.format('MMMM Do YYYY, h:mm');
        let task = this.props.task;
        let remaining = this.getRemainingFormatted();

        let isNotStarted = this.state.status === this.state.statuses.NOT_STARTED;
        let isActive = this.state.status === this.state.statuses.ACTIVE;
        let isFinished = this.state.status === this.state.statuses.FINISHED;

        //&& this.props.setLineColor('#a6a6a6')
       
        return (
            <div>
                <div>
                    {isNotStarted  && <NotStarted task={task} start={start} end={end} />}
                    {isActive && <Active task={task} start={start} remaining={remaining} />}
                    {isFinished && <Ended task={task} start={start} end={end} />}
                </div>
            </div>
        );
    }
}

const NotStarted = (props) => {
    return (
        <div  style={{background: "#ffffff"}}>
            {props.task}<br />
            <BoxSpan>Starting:{props.start}</BoxSpan>
            <BoxSpan>Finishing:{props.end}</BoxSpan>
        </div>
    );
}

const Active = (props) => {
    console
    return (
        <div  style={{background: "#baffc9"}}>
            {props.task}<br />
            <BoxSpan>Started: {props.start}</BoxSpan>
            <BoxSpan>Remaining: {props.remaining}</BoxSpan>
        </div>
    );
}

const Ended = (props) => {
    return (
        <div  style={{background: "#bae1ff"}}>
             {props.task}<br />
            <BoxSpan>Started:{props.start}</BoxSpan>
            <BoxSpan>Finished:{props.end}</BoxSpan>
        </div>
    );
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

