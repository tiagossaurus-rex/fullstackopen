import React from 'react'
import ReactDOM from 'react-dom'

import CourseInfo from './01_courseinfo';
import Unicafe from './02_unicafe';

const App = () => {

    return (
        <div>
            <CourseInfo />
            <Unicafe />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))