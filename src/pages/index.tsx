/**
 * Module dependencies.
 */

import Table from 'components/table';
import useGetAllCapsules, { fetchCapsules } from 'hooks/getAllCapsules';
import type { NextPage } from 'next';
import Link from 'next/link';
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
	return (
		<Container>
			<ul>
				<li>
					<Link href="/">
						<a>Homesdadsadadsadaszhfiudshsfkhvciuhdfsivhisvhvobs</a>
					</Link>
				</li>
				<li>
					<Link href="/create_capsule">
						<a>Create Capsule</a>
					</Link>
				</li>
			</ul>
			<Table dataHook={useGetAllCapsules} />
		</Container>
	);
};

/**
 * Export `Home` page.
 */

export default Home;
