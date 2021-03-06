import React, { Component } from 'react';
import Input from './common/input';
class LoginForm extends Component {
	state = {
		account: {
			username: '',
			password: ''
		},
		error: {}
	};

	validate = () => {
		const errors = {};
		const { account } = this.state;
		if (account.username.trim() === '') errors.username = 'Username is required';
		if (account.password.trim() === '') errors.password = 'Password is required';
		return Object.keys(errors).length === 0 ? null : errors;
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate();
		console.log(errors);
		this.setState({ errors });

		if (errors) return;
		console.log('server call');
	};

	handleChange = (currentTarget) => {
		const account = { ...account };
		account[currentTarget.name] = currentTarget.value;
		this.setState({
			account
		});
	};
	render() {
		const { account } = this.state;
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<Input name="username" value={account.username} label="Username" onChange={this.handleChange} />
					<Input name="password" value={account.username} label="Password" onChange={this.handleChange} />
					<button className="btn btn-primary">Login</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
