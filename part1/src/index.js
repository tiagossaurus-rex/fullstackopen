import React from 'react'
import ReactDOM from 'react-dom'

import CourseInfo from './01_courseinfo';
import Unicafe from './02_unicafe';
import Anecdotes from './03_anecdotes';

const App = () => {

    return (
        <div>
            <CourseInfo />
            <Unicafe />
            <Anecdotes />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))