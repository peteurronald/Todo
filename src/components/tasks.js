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
    let isUrgent = (task.priority === "4" || task.priority === "3");
    let isImportant = (task.priority === "4" || task.priority === "2");
    return (
      <li onClick={() => this.delete(task.key)} key={task.key} >
        <div>
          {/* {task.task} */}
          <Timebox task={task.task} startDate={task.startDate} endDate={task.endDate} />
        </div>
        {isImportant && <img src="images/important.png" height="25px" width="25px" />}
        {isUrgent && <img src="images/urgent.png" height="25px" width="25px" />}
        <img src="images/tick.png" height="30px" width="30px" />
      </li>
    )
  }
  handleUpdateTaskStorage = () => {
    this.props.updateTaskStorage();
  }
  delete(key) {
    this.props.delete(key);
  }
  render() {
    let tasks = this.props.tasks;

    let sortedTasks = tasks.sort(function (atask, btask) {
      if (atask.priority > btask.priority)
        return -1
      if (atask.priority < btask.priority)
        return 1
      return 0
    });

    let taskList = sortedTasks.map(this.createTasks);
    return (
      <ul className="theList">
        <FlipMove duration={350} easing="ease-out">
          {taskList}
        </FlipMove>
      </ul>
    );
  }
};


export default TodoTasks;