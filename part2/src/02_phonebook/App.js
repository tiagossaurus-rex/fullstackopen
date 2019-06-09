import React, { useState } from 'react'
import axios from 'axios';


const Form = (props) => {
	return (
		<form onSubmit={e => props.handleSubmit(e)}>
			{props.children}
			<div>
				<button disabled={props.disabled} type="submit">add</button>
			</div>
		</form>
	)
}

const Input = ({id, value, handleChange}) => {
	return (
		<div>
			{id}: <input value={value} onChange={e => handleChange(e.target.value)}/>
		</div>
	)
}

const Filter = ({value, handleChange}) => {
	return (
		<div>
			filter: 
			<input value={value} onChange={e => handleChange(e.target.value.toLowerCase())}/>
			<button onClick={() => handleChange('')}>x</button>
		</div>
	)
}

const Entry = ({name, number})=> <p>{`${name}: ${number ? number : 'unknown'}`}</p>

const Persons = ({persons, filter}) => {
	return (
		persons
			.filter(({name}) => name.toLowerCase().indexOf(filter) !== -1 )
			.map(({name, number}) => <Entry key={name} name={name} number={number} />)
	)
}


const App = () => {
	const [ persons, setPersons] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filter, setFilter ] = useState('')

	useState(() => {
		axios
        .get('http://localhost:3001/persons')
        .then(response => {
            setPersons(response.data)
        })
	}, [])


	const handleSubmit = (e) => {
		e.preventDefault();
		if ( !newName || !newNumber ) return false;

		const hasDup = persons.filter(person => person.name === newName)

		if ( hasDup.length ) {
			alert(`${newName} is already added to phonebook`)
		} else {
			setPersons([
				...persons,
				{
					name: newName,
					number: newNumber,
				},
			])
			setNewName('')
			setNewNumber('')
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={filter} handleChange={setFilter} />
			<h2>Add new</h2>
			<Form
				handleSubmit={handleSubmit}
				disabled={!newName || !newNumber}
				>
				<Input 
					id="name"
					value={newName}
					handleChange={setNewName}
					/>
				<Input 
					id="number"
					value={newNumber}
					handleChange={setNewNumber}
					/>
			</Form>
			<h2>Numbers</h2>
			<Persons persons={persons} filter={filter} />
		</div>
	)
}

export default App