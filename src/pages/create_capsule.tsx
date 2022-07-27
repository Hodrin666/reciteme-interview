/**
 * Module dependencies.
 */

import Table from 'components/table';
import useGetAllCapsules, { fetchCapsules } from 'hooks/getAllCapsules';
import { useFindOneCapsule } from 'hooks/getOneCapsule';
import type { NextPage } from 'next';
import Link from 'next/link';
import {
	ChangeEvent,
	ChangeEventHandler,
	FormEventHandler,
	useState,
} from 'react';
import styled from 'styled-components';
import { device } from 'theme';

/**
 * `Container` styled component.
 */

const Container = styled.section`
	max-width: 1920px;
	padding: 12px 16px;

	@media ${device.xs} {
		padding: 30px 40px;
	}
`;

/**
 * `Home` function page.
 */

const Home: NextPage = () => {
	const { mutateAsync } = useFindOneCapsule();
	const [id, setId] = useState<string>('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setId(event?.target?.value);
	};

	const handleFormSubmit = async () => {
		event?.preventDefault();
		try {
			const data = await mutateAsync(id);
		} catch (error) {}
	};

	return (
		<Container>
			<ul>
				<li>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href="/create_capsule">
						<a>Create Capsule</a>
					</Link>
				</li>
			</ul>
			<Table dataHook={useGetAllCapsules} />

			<form onSubmit={handleFormSubmit}>
				<input type="text" value={id} onChange={handleChange} />
				<button type="submit">{'Get Capsule by update message'}</button>
			</form>
		</Container>
	);
};

/**
 * Export `Home` page.
 */

export default Home;
