import React, { useState } from 'react'

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

const Entry = ({person, handleDelete})=> {
    return (
        <p>
            {`${person.name}: ${person.number ? person.number : 'unknown'}`}
            <button onClick={(e) => handleDelete(e, person)}>
                delete
            </button>
        </p>
    )
}

const Persons = ({persons, filter, handleDelete}) => {
	return (
		persons
			.filter(({name}) => name.toLowerCase().indexOf(filter) !== -1 )
			.map((person) => (
                <Entry
                    key={person.name}
                    person={person}
                    handleDelete={handleDelete}
                    />
            ))
	)
}

export {
    Form,
    Input,
    Filter,
    Entry,
    Persons,
}