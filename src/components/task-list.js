import React, { Component } from "react";
import TodoTasks from "./tasks";
import Datetime from 'react-datetime';
import moment from 'moment'
import "../styling/todo-list.css";
import "../styling/react-datetime.css";

class TodoList extends Component {
  constructor(props, context) {
        super(props, context);
        this.state = {
          tasks: [],
          target: moment()
        };
  }
  handleSubmitForm = (e) => {
    e.preventDefault();
    let value = e.target[0].value;
    if(value.trim().length === 0) return;

    let task = {task: value};
    let key = {key: Date.now()};
    let target = {target: this.state.target};
    let tasks = this.state.tasks;
    
    tasks.push(Object.assign(task, key, target));
    this.setState(tasks);
   }
   handleDeleteTask = (key) => {
    let filteredItems = this.state.tasks.filter(function (task) {
        return (task.key !== key);
    });
     
    this.setState({tasks: filteredItems});
   }
   handleDateChange = (target) => {
      if(target.isBefore(moment())) {
        alert("Target Date is in the past");
      } else {
        this.setState({target});
      }
   }
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
            <form  onSubmit={this.handleSubmitForm}>          
                
              <div className="flex-container">
                  <label className="title" for="task">Task</label>
                  <input className="task" placeholder="Enter a task ..." ref="theTask"  />
              </div> 

                <div className="flex-container">
                  <label  for="target"> Target Time</label>
                  <Datetime 
                    dateFormat={'D MMM YYYY'}
                    value= {this.state.target}
                    onChange={this.handleDateChange}
                  /> 
                  <button type="submit">add</button>
                </div>
              

            </form>       
            <TodoTasks entries={this.state.tasks} delete={this.handleDeleteTask}/>
        </div>
        
      </div>
      );
  }
}
 
export default TodoList;