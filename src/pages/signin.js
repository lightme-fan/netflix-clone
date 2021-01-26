import React, { useState, useContext } from 'react';
import { Form } from '../components';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { FirebaseContext } from '../context/firebase';
import HeaderContainer from '../containers/header';
import FooterContainer from '../containers/footer';

export default function Signin() {
	const { firebase } = useContext(FirebaseContext);
	const history = useHistory();
	const [error, setError] = useState('');
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');

	const isInvalid = password === '' || emailAddress === '';

	const handleSignin = (event) => {
		event.preventDefault();
		// call in here to firebase to authenticate the user
		// if there's an error, populate the error state
		firebase
			.auth()
			.signInWithEmailAndPassword(emailAddress, password)
			.then(() => {
				setEmailAddress('');
				setPassword('');
				setError('');
				history.push(ROUTES.BROWSE);
			})
			.catch((error) => setError(error.message));
	};

	return (
		<>
			<HeaderContainer>
				<Form>
					<Form.Title>Sign in</Form.Title>
					{error && <Form.Error>{error}</Form.Error>}

					<Form.Base onSubmit={handleSignin} method="POST">
						<Form.Input
							placeholder="Email address"
							value={emailAddress}
							onChange={({ target }) => setEmailAddress(target.value)}
						/>
						<Form.Input
							type="password"
							placeholder="Password"
							autoComplete="off"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<Form.Submit disabled={isInvalid} type="submit">
							Sign in
						</Form.Submit>

						<Form.Text>
							New to Netflix? <Form.Link to="/signup">Sign up now.</Form.Link>
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
