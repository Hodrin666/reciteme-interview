/**
 * Module dependencies.
 */

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Table from 'components/table';
import useGetAllCapsules, { fetchCapsules } from 'hooks/getAllCapsules';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
	const mutation = useMutation(newTodo => {
		return (
			axios.post('https://api.spacexdata.com/v4/capsules/query', {
				query: newTodo,
			}),
			{
				onMutate: async (newTodo: string) => {
					console.log(newTodo);
				},
			}
		);
	});

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

			<form
				onClick={() => {
					event?.preventDefault();
					mutation.mutate(event?.target!.id.value);
				}}
			>
				<input type="text" id="id" />
				<button type="submit">{'Get Capsule'}</button>
			</form>
		</Container>
	);
};

/**
 * Export `Home` page.
 */

export default Home;
function newData() {
	throw new Error('Function not implemented.');
}
