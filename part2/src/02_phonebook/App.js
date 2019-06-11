import React, { useState, useEffect } from 'react'

import {
	Form,
	Input,
	Filter,
	Persons,
	Notification,
} from './components'

import personsService from './services/persons'


const App = () => {
	const [ persons, setPersons] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filter, setFilter ] = useState('')

	const [ notification, setNotification ] = useState(null);

	useState(() => {
		personsService
			.getAll()
			.then(data => {
				setPersons(data)
			})
	}, [])

	useEffect(() => {
		const wait = setTimeout(() => {
			if(notification !== null) {
				console.log('asdada')
				setNotification(null)
			}
		}, 5000)

		return(() => {
			clearTimeout(wait)
		})
	}, [notification])

	const handleSubmit = (e) => {
		e.preventDefault();
		if ( !newName || !newNumber ) return false;

		const existingDup = persons.filter(person => person.name === newName)

		const newPerson = {
			name: newName,
			number: newNumber,
		}

		if ( existingDup.length ) {
			
			const confirmDialog = window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			)

			if ( confirmDialog ) {
				
				personsService
					.update(existingDup[0].id, newPerson)
					.then(updatedPerson => {
						
						setPersons(
							persons.map(person => {
								return person.id === updatedPerson.id ? updatedPerson : person
							})
						)
						
						setNewName('')
						setNewNumber('')
						setNotification({
							message: `Updated ${newName}`,
							type: 'success',
						})
					})
					.catch((error) => {
						setNotification({
							message: 'Something went wrong, please try again',
							type: 'error',
						});
						setPersons(persons.filter(p => p.id !== existingDup[0].id))
						setNotification({
							message: `${newName} has already been removed from server`,
							type: 'error',
						});
					})
			}


		} else {

			personsService
				.create(newPerson)
				.then(data => {
					setPersons([
						...persons,
						data,
					])
					setNewName('')
					setNewNumber('')
					setNotification({
						message: `Added ${newName}`,
						type: 'success',
					});
				})
				.catch((error) => {
					setNotification({
						message: 'Something went wrong, please try again',
						type: 'error',
					});
				})

		}
	}

	const handleDelete = (e, person) => {
		e.preventDefault();

		const confirmDialog = window.confirm(`delete ${person.name}`)

		if ( confirmDialog ) {
			personsService
				.remove(person.id)
				.then(data => {
					setPersons(persons.filter(p => p.id !== person.id))
					setNotification({
						message: `Deleted ${person.name}`,
						type: 'success',
					});
				})
				.catch((error) => {
					setPersons(persons.filter(p => p.id !== person.id))
					setNotification({
						message: `${person.name} has already been removed from server`,
						type: 'error',
					});
				})
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification notification={notification} />
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
			<Persons persons={persons} filter={filter} handleDelete={handleDelete} />
		</div>
	)
}

export default App