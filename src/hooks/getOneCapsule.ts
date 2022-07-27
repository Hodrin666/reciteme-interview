import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import capsule from 'hooks/getAllCapsules';

async function fetchOneCapsule(findQuery: string) {
	try {
		const { data } = await axios.post(
			'https://api.spacexdata.com/v4/capsules/query',
			{
				options: {
					limit: 5,
				},
				query: {
					last_update: findQuery,
				},
			}
		);

		return data;
	} catch (error) {
		throw new Error('Fetch went Wrong');
	}
}

export function useFindOneCapsule() {
	return useMutation(fetchOneCapsule);
}
