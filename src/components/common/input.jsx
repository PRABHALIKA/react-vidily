import React, { Component } from 'react';
const Input = (props) => {
	const { name, value, onChange, label } = props;
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input id={name} type="text" value={value} name={name} onChange={onChange} className="form-control" />
		</div>
	);
};

export default Input;
