import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick} >
            {text}
        </button>
    )
}
const Statistic = ({name, val}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{val}</td>
        </tr>
    )
}
const Statistics = ({stats}) => {
    const average = (stats.good - stats.bad) / stats.all;
    const positive = stats.good / stats.all * 100;

    return (
        <table>
            <tbody>
                { Object.keys(stats).map(stat => 
                    <Statistic key={stat} name={stat} val={stats[stat]} />
                )}
                <Statistic name="average" val={average} />
                <Statistic name="average" val={`${positive}%`} />
            </tbody>
        </table>
    )
}

const App = () => {
    
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    const handleClick = (fb) => {
        switch (fb) {
            case 'good':
                setGood(good + 1)
                setAll(all + 1)
                break;
                
            case 'neutral':
                setNeutral(neutral + 1)
                setAll(all + 1)
                break;
                
            case 'bad':
                setBad(bad + 1)
                setAll(all + 1)
                break;
        
            case 'reset':
                setGood(0)
                setNeutral(0)
                setBad(0)
                setAll(0)
                return false;
    
            default:
                console.log('unhandled case')
                return false;
        }
    }

    return (
        <div>
            <h1>Give feedback</h1>
            <div>
                <Button
                    handleClick={() => handleClick("good")}
                    text="good"
                    />
                <Button
                    handleClick={() => handleClick("neutral")}
                    text="neutral"
                    />
                <Button
                    handleClick={() => handleClick("bad")}
                    text="bad"
                    />
                    
                <Button
                    handleClick={() => handleClick("reset")}
                    text="reset"
                    />
            </div>
            <h1>statistics</h1>
            {
                all > 0 ?
                <Statistics stats={{good, neutral, bad, all}} />
                :
                "No feedback given"
            }
        </div>
    )
}

export default App;