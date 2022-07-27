/**
 * Module dependencies.
 */

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type capsule = {
	docs: [
		{
			id: string;
			land_landings: number;
			last_update: string;
			launches: string[];
			reuse_count: number;
			serial: string;
			status: string;
			type: string;
			water_landings: number;
		}
	];
	hasNextPage: boolean;
	hasPrevPage: boolean;
	totalPages: number;
	page: number;
	offset: number;
};

export async function fetchCapsules(offset: number = 0) {
	try {
		const { data } = await axios.post(
			'https://api.spacexdata.com/v4/capsules/query',
			{
				options: {
					limit: 10,
					offset: offset,
				},
			}
		);

		return data;
	} catch (error) {
		throw new Error('Fetch went Wrong');
	}
}

/**
 * Export `useGetAllCapsules` hook function.
 */

export default function useGetAllCapsules(offset: number = 0) {
	return useQuery<capsule>(['capsules', offset], () => fetchCapsules(offset), {
		keepPreviousData: true,
	});
}
