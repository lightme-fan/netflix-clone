import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import HeaderContainer from '../containers/header';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';
import FooterContainer from '../containers/footer';

export default function Signup() {
	const history = useHistory();
	const { firebase } = useContext(FirebaseContext);
	const [firstName, setFirstName] = useState('');
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	// form validation
	const isInvalid = firstName === '' || password === '' || emailAddress === '';

	// handleSignUp (takes the event)
	const handleSignUp = (event) => {
		event.preventDefault();

		firebase
			.auth()
			.createUserWithEmailAndPassword(emailAddress, password)
			.then((result) => {
				result.user
					.updateProfile({
						displayName: firstName,
						photoURL: Math.floor(Math.random() * 5) + 1,
					})
					.then(() => {
						setEmailAddress('');
						setPassword('');
						setError('');
						history.push(ROUTES.BROWSE);
					});
			})
			.catch((error) => setError(error.message));
	};

	// try to do the markup

	return (
		<>
			<HeaderContainer>
				<Form>
					<Form.Title>Sign Up</Form.Title>
					{error && <Form.Error>{error}</Form.Error>}
					<Form.Base onSubmit={handleSignUp} method="POST">
						<Form.Input
							value={firstName}
							onChange={({ target }) => setFirstName(target.value)}
							placeholder="First Name"
						/>
						<Form.Input
							value={emailAddress}
							onChange={({ target }) => setEmailAddress(target.value)}
							placeholder="Email Address"
						/>
						<Form.Input
							value={password}
							type="password"
							autoComplete="off"
							onChange={({ target }) => setPassword(target.value)}
							placeholder="Password"
						/>
						<Form.Submit type="submit" disabled={isInvalid}>
							Sign Up
						</Form.Submit>
						<Form.Text>
							Already have another account?&nbsp;
							<Form.Link to={ROUTES.SIGN_IN}>Sign in.</Form.Link>
						</Form.Text>
						<Form.TextSmall>
							This page is protected by Google reCAPTCHA.
						</Form.TextSmall>
					</Form.Base>
				</Form>
			</HeaderContainer>
			<FooterContainer />
		</>
	);
}
