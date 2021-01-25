import React, { useState } from 'react'

import * as ROUTES from '../constants/routes'
import { FirebaseContext } from '../context/firebase'
import FooterContainer from './footer'
import { SelectProfileContainer } from './profiles'

export default function BrowseContainer() {
    const [ profile, setProfile ] = useState({})

    const user = {
        displayName: "Fanilo",
        photoURL: "3"
    }

    return profile.displayName ? (
        <>
            <FooterContainer/>
        </>
    ) : (
        <SelectProfileContainer user={user} setProfile={setProfile}/>
    )
}
