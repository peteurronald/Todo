import React, { Component } from "react";
import TodoTasks from "./tasks";
import Datetime from 'react-datetime';
import moment from 'moment';
import uuidV4 from 'uuid/v4';
import loremIpsum from 'lorem-ipsum';

import "../styling/todo-list.css";
import "../styling/react-datetime.css";

class TodoList extends Component {
  constructor(props, context) {
    super(props, context);

    // controlled state
    this.state = {
      tasks: [],
      startDate: moment(),
      endDate: moment().add(1, 'day'),
      priority: 0
    };
    // fill tasks from localstorage
    this.state.tasks = JSON.parse(localStorage.getItem("tasks"));
    if (this.state.tasks == null) {
      this.state.tasks = [];
    }

    // convert strings back to moments
    this.state.tasks.map(task => {
      task.startDate = moment(task.startDate);
      task.endDate = moment(task.endDate);
    });


  }

  handleSubmitForm = (e) => {
    e.preventDefault();

    // what is the new task
    let text = e.target[0].value;
    if (text.trim().length === 0) text = loremIpsum({count: 3});

    // create new task
    let key = { key: uuidV4() };
    let task = { task: text };
    let startDate = { startDate: this.state.startDate };
    let endDate = { endDate: this.state.endDate };
    let priority = { priority: this.state.priority };

    // update tasks
    let tasks = this.state.tasks;
    tasks.push(Object.assign(key, task, startDate, endDate, priority));

    // save task to state and local storage
    this.setState(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // task has been created, update the start time/ end time to now
    // to keep the time moving forward   
    this.setState({ startDate: moment() });
    this.setState({ endDate: moment().add(1, 'day') });
  }

  handleDeleteTask = (key) => {

    // filter out tasks that do not have this startDate
    let tasks = this.state.tasks.filter(function (task) {
      return (task.key !== key);
    });
    // and save to state and local storage
    this.setState({ tasks: tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));

  }

  handleEndDateChange = (endDate) => {
    // Only allow future end dates
    if (endDate.isBefore(moment())) {
      alert("End date is in the past");
    } else {
      this.setState({ endDate });
    }
  }

  handleStartDateChange = (startDate) => {
    // Can't have start after end
    if (startDate.isAfter(this.state.endDate)) {
      alert("Start date is after end date.");
    } else {
      this.setState({ startDate });
    }
  }

  handlePriorityChange = (e) => {
    this.setState({
      priority: e.target.value
    })
  }
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.handleSubmitForm}>

            <div className="flex-container">
              <label className="title">Task</label>
              <input className="task" placeholder="Enter a task ..." ref="theTask" />              
            </div>

            <div className="flex-container">
              <label> Start Time</label>
              <Datetime
                dateFormat={'D MMM YYYY'}
                value={this.state.startDate}
                onChange={this.handleStartDateChange}
              />
              <label> End Time</label>
              <Datetime
                dateFormat={'D MMM YYYY'}
                value={this.state.endDate}
                onChange={this.handleEndDateChange}
              />
              <button type="submit">add</button>
            </div>

            <div>
              <label htmlFor="priority" >Priority</label>
              <select value={this.state.priority} onChange={this.handlePriorityChange} >
                <option value="1">No priority</option>
                <option value="4">Urgent and Important</option>
                <option value="3">Urgent</option>
                <option value="2">Important</option>
              </select>
            </div>

          </form>
          <TodoTasks tasks={this.state.tasks} delete={this.handleDeleteTask} />
        </div>

      </div>
    );
  }
}

export default TodoList;