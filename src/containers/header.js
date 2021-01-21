import React from 'react'

import * as ROUTE from '../constants/routes'
import Header from '../components/header'


export function HeaderContainer({ children }) {
    return (
        <Header>
            <Header.Frame>
                <Header.Logo to={ROUTE.HOME} src="/images/misc/logo.svg" alt="Netflix"/>
                <Header.ButtonLink to={ROUTE.SIGN_IN}>Sign in</Header.ButtonLink>
            </Header.Frame>
            {children}
        </Header>
    )
}
