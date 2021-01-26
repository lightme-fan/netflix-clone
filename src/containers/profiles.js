import React from 'react';
import { Header, Profiles } from '../components';
import * as ROUTES from '../constants/routes';

export default function SelectProfileContainer({ user, setProfile }) {
	return (
		<>
			<Header bg={false}>
				<Header.Frame>
					<Header.Logo to={ROUTES.HOME} src="/images/misc/logo.svg" />
				</Header.Frame>
			</Header>
			<Profiles>
				<Profiles.Title>Who's watching?</Profiles.Title>
				<Profiles.List>
					<Profiles.User
						onClick={() =>
							setProfile({
								displayName: user.displayName,
								photoUrl: user.photoUrl,
							})
						}
					>
						<Profiles.Picture src={user.photoURL} />
						<Profiles.Name>{user.displayName}</Profiles.Name>
					</Profiles.User>
				</Profiles.List>
			</Profiles>
		</>
	);
}
