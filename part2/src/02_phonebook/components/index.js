import React, { useState, useEffect } from 'react'

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


const Notification = ({notification}) => {


	if ( !notification ) {
		return null;
	}

	const {
		message,
		type
	} = notification;

	const style = {
		default: {
			display: 'block',
			background: `rgba(76, 175, 80, 0.2)`,
			border: `2px solid #4CAF50`,
			color: '#1b5e20',
			padding: '0 16px',
			margin: '16px 0',
			fontWeight: 'bold',
		},
		success: {
			background: `rgba(76, 175, 80, 0.2)`,
			border: `2px solid #4CAF50`,
			color: '#1b5e20',
		},
		error: {
			background: `rgba(244, 67, 54, 0.2)`,
			border: `2px solid #f44336`,
			color: '#B71C1C',
		},
	}
	

	return (
		<div style={{
				...style.default,
				...style[type]
			}}>
			<p>{message}</p>
		</div>
	)
}

export {
    Form,
    Input,
    Filter,
    Entry,
	Persons,
	Notification,
}