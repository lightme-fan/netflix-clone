import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';

import { Form } from '../components';
import * as ROUTES from '../constants/routes';
import HeaderContainer from '../containers/header';
import FooterContainer from '../containers/footer';
import { FirebaseContext } from '../context/firebase';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [error, setError] = useState('');
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const handleSignup = (e) => {
    e.preventDefault()
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then((result) => {
        result.user.updateProfile({
          displayName: firstName,
          photoURL: Math.floor(Math.random() * 5) + 1
        })
        .then(() => {
          setEmailAddress('');
          setPassword('');
          setError('');
          history.push(ROUTES.BROWSE);
        })
      })
      .catch((error) => setError(error.massage));
  }

  const isInValid = firstName === '' || emailAddress === '' || password === '';
 
  return (
    <>
      <HeaderContainer>
      <Form>
        <Form.Title>Sign up</Form.Title>
        {error && <Form.Error>{error}</Form.Error>}
        <Form.Base onSubmit={handleSignup}>
          <Form.Input
            placeholder="firstName"
            value={firstName}
            onChange={({target}) => setFirstName(target.value)}
          />
          <Form.Input
            placeholder="Email address"
            value={emailAddress}
            onChange={({target}) => setEmailAddress(target.value)}
          />
          <Form.Input
            type="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
          <Form.Submit disabled={isInValid} type="submit">
            Sign Up
          </Form.Submit>
          <Form.Text>
            Already have an account? <Form.Link to='/signin'>
              Sign In
            </Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google RICAPICHA
          </Form.TextSmall>
        </Form.Base>
      </Form>
    </HeaderContainer>
      <FooterContainer />
    </>
  )
}