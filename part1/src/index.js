import React from 'react'
import ReactDOM from 'react-dom'

import CourseInfo from './01_courseinfo';

const App = () => {

    return (
        <div>
            <CourseInfo />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))