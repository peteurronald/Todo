import React, { Component } from "react";
import "../styling/todo-list.css";
import FlipMove from 'react-flip-move';
import moment from 'moment';
import Timebox from './timebox';

class TodoTasks extends Component {
  constructor(props, context) {
    super(props, context);
  }
  createTasks = (task) => {
    return (
      
      <li onClick={() => this.delete(task.key)} key={task.key}>
        <div>
          {task.task}
          <Timebox start={task.key}/>
        </div>
        <img src="images/tick.png" height="30px" width="30px" />
      </li>

    )
  }
  delete(key) {
    this.props.delete(key);
  }
  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);
    return (
      <ul className="theList">
        <FlipMove duration={350} easing="ease-out">
          {listItems}
        </FlipMove>
      </ul>
    );
  }
};

export default TodoTasks;