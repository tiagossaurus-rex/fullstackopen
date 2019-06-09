import React, { useState, useEffect } from 'react'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState({})
    const [hasVotes, setHasVotes] = useState(false)
    const [max, setMax] = useState(null)

    useEffect(() => {
        const defaultState = {};
        anecdotes.forEach((a, i)=> defaultState[i] = 0)
        setPoints(defaultState)
    }, [])
    
    useEffect(() => {
        if(hasVotes) {
            let _max = Object.entries(points).reduce((prev, current) => {
                return current[1] > prev[1] ? current : prev;
            })
            setMax(_max)
        }
    }, [points, hasVotes])

    const handleNext = () => {
        const random =  Math.floor((Math.random() * anecdotes.length))
        setSelected( random )
    }
    const handleVote = () => {
        setPoints({
            ...points,
            [selected]: points[selected] ? points[selected] + 1 : 1
        })
        setHasVotes(true)
    }

  return (
    <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
        <br />
        {`has ${points[selected]} votes`}
        <br />
        <button onClick={() => handleVote()}>vote</button>

        <br />
        <button onClick={() => handleNext()}>next anecdote</button>

        {
            hasVotes && max &&
            <>
                <h1>Anecdote with most votes</h1>
                { anecdotes[max[0]] }
                <br/>
                {`has ${max[1]} votes`}
            </>

        }

    </div>
  )
}


export default App;