import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Form } from '../components'
import * as ROUTES from '../constants/routes';
import HeaderContainer from '../containers/header';
import FooterContainer from '../containers/footer';
import { FirebaseContext } from '../context/firebase';

export default function Signin() {
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const [error, setError ] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = (event) => {
    event.preventDefault()
    firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        setEmailAddress('');
        setPassword('');
        setError('');
        history.push(ROUTES.BROWSE);
      })
      .catch((error) => setError(error.message))
  }

  const isInValid = password === '' || emailAddress === '';

  return (
  <>
    <HeaderContainer>
      <Form>
        <Form.Title>Sign in</Form.Title>
        {error && <Form.Error>{error}</Form.Error>}
        <Form.Base onSubmit={handleSignin}>
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
            Sign in
          </Form.Submit>
          <Form.Text>
            New to Netfilx? <Form.Link to="/signup">
              Sign up  now
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
