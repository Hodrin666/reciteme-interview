/**
 * Module dependencies.
 */

import { useQueryClient, UseQueryResult } from '@tanstack/react-query';
import useGetAllCapsules, {
	capsule,
	fetchCapsules,
} from 'hooks/getAllCapsules';
import useWindowDimensions from 'hooks/getWindowSize';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { device, size } from 'theme';

type Props = {
	dataHook: (offset: number) => UseQueryResult<capsule, unknown>;
};

/**
 * `TableContainer` styled component.
 */

const TableContainer = styled.div`
	border: 1px solid black;
	border-radius: 15px;
	display: grid;
	grid-gap: 8px;
	grid-template-rows: 1fr 40px;
	overflow: hidden;
`;

/**
 * `Grid` styled component.
 */

const Grid = styled.div``;

/**
 * `Grid` styled component.
 */

const Row = styled.div`
	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	align-items: center;
	border-bottom: 1px solid black;
	align-items: center;

	@media ${device.m} {
		grid-template-columns: 1fr 3fr repeat(6, 1fr);
		justify-content: center;
	}
`;

/**
 * `Grid` styled component.
 */

const Column = styled.th<{ col: string; row: string }>`
	grid-column: ${props => props.col};
	grid-row: ${props => props.row};
`;

/**
 * `TableMenu` styled component.
 */

const TableMenu = styled.div`
	align-items: center;
	justify-content: center;
	grid-row: 2;
	background-color: #e6e6e6;
	display: grid;
	grid-template-columns: 40% 20% 40%;

	@media ${device.m} {
		grid-template-columns: 1fr repeat(2, 100px);
		justify-content: center;
	}
`;

/**
 * `TablePagination` styled component.
 */

const TablePagination = styled.div`
	display: grid;
	grid-template-columns: 16px 16px;
	grid-column: 2;
`;

/**
 * `StyledImage` styled component.
 */

const StyledImage = styled(Image)`
	transform: rotate(180deg);
`;

/**
 * `StyledParagraph` styled component.
 */

const StyledParagraph = styled.p`
	font-size: 16px;
	grid-column: 3;
	margin: 0;
`;

/**
 * `StyledButton` styled component.
 */

const StyledButton = styled.button`
	padding: 0;
	border: 0;
	display: grid;
	align-items: center;
	justify-content: center;
`;

/**
 * `Table` function page.
 */

const Table = (props: Props): JSX.Element => {
	const { dataHook } = props;
	const queryClient = useQueryClient();
	const [offset, setOffset] = useState(0);
	const { data, isLoading, isError, isPreviousData, isFetching } =
		dataHook(offset);

	const { width } = useWindowDimensions();

	useEffect(() => {
		if (data?.hasNextPage) {
			queryClient.prefetchQuery(['capsules', data.offset + 10], () =>
				fetchCapsules(data.offset + 10)
			);
		}
	}, [data, offset, queryClient]);

	if (isLoading) {
		return <p>{'Loading...'}</p>;
	}

	if (isError) {
		return <span>{'Error'}</span>;
	}

	const tableHead = [
		'Land landings',
		'Last Update',
		'Launches',
		'Reuses',
		'Serial',
		'Status',
		'Type',
		'Water Landings',
	];

	return (
		<TableContainer>
			<Grid as={'table'}>
				{width > Number(size.m) ? (
					<>
						<Row>
							{tableHead.map((value, key) => (
								<Column as={'th'} key={key} col={`${key + 1}`} row={'1'}>
									{value}
								</Column>
							))}
						</Row>

						{data.docs.map((value, key) => (
							<Row as={'tr'} key={key}>
								<Column col={'1'} row={'1'}>
									{value.land_landings}
								</Column>
								<Column col={'2'} row={'1'}>
									{value.last_update}
								</Column>
								<Column col={'3'} row={'1'}>
									{'...'}
								</Column>
								<Column col={'4'} row={'1'}>
									{value.reuse_count}
								</Column>
								<Column col={'5'} row={'1'}>
									{value.serial}
								</Column>
								<Column col={'6'} row={'1'}>
									{value.status}
								</Column>
								<Column col={'7'} row={'1'}>
									{value.type}
								</Column>
								<Column col={'8'} row={'1'}>
									{value.water_landings}
								</Column>
							</Row>
						))}
					</>
				) : (
					data.docs.map((value, key) => (
						<Row key={key}>
							<Column col={'1'} row={'2'}>
								{value.serial}
							</Column>
							<Column col={'2'} row={'1/3'}>
								{value.status}
							</Column>
							<Column col={'1'} row={'1'}>
								{value.type}
							</Column>
						</Row>
					))
				)}
			</Grid>
			<TableMenu>
				<TablePagination>
					<StyledButton
						disabled={offset === 0}
						onClick={() => setOffset(old => Math.max(old - 10, 0))}
					>
						<StyledImage
							alt="arrow-back"
							src={'/next-arrow.svg'}
							width={16}
							height={16}
						/>
					</StyledButton>

					<StyledButton
						disabled={isPreviousData || !data.hasNextPage}
						onClick={() => {
							setOffset(old => (data?.hasNextPage ? old + 10 : old));
						}}
					>
						<Image
							alt="arrow-next"
							src={'/next-arrow.svg'}
							width={16}
							height={16}
						/>
					</StyledButton>
				</TablePagination>

				<StyledParagraph>
					{'Page: '}
					{data.page}
					{' / '}
					{data.totalPages}
				</StyledParagraph>
			</TableMenu>
		</TableContainer>
	);
};

export default Table;
