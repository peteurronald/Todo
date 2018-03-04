import React, { Component } from "react";
import TodoTasks from "./tasks";
import "../styling/todo-list.css";

class TodoList extends Component {
  constructor(props, context) {
        super(props, context);
        this.state = {
          tasks: []
        };
  }
  handleSubmitForm = (e) => {
    e.preventDefault();
    let value = e.target[0].value;
    if(value.trim().length === 0) return;

    let task = {task: value};
    let key = {key: Date.now()};
    let tasks = this.state.tasks;
    
    tasks.push(Object.assign(task, key));
    this.setState(tasks);
   }
   handleDeleteTask = (key) => {
    let filteredItems = this.state.tasks.filter(function (task) {
        return (task.key !== key);
    });
     
    this.setState({
        tasks: filteredItems
    });
   }
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
            <form onSubmit={this.handleSubmitForm}>
                <input placeholder="enter task" ref="theTask"  />
                <button type="submit">add</button>
            </form >
            <TodoTasks entries={this.state.tasks} delete={this.handleDeleteTask}/>
        </div>
        
      </div>
      );
  }
}
 
export default TodoList;