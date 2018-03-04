
import React from 'react'

class ThirdPage extends React.Component{

    constructor() {
        super()
        this.state = { count: 0 }
    }

    render() {
        return(
          <div>
            <h1>Page 3</h1>
            <p>Count: {this.state.count}</p>
            <button onClick={() => this.setState({count: this.state.count + 1})}>+</button>
            <button onClick={() => this.setState({count: this.state.count - 1})}>-</button>
          </div>
        )
    }
}

export default ThirdPage