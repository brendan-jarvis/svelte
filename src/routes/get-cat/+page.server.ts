import { env } from '$env/dynamic/private';

export const load = async () => {
	const fetchCat = async () => {
		const res = await fetch(
			`https://api.thecatapi.com/v1/images/search?api_key=${env.PRIVATE_CAT_API_KEY}`
		);
		const cat = await res.json();

		if (!res.ok) {
			throw new Error('Something went wrong');
		}

		return cat;
	};

	return {
		cat: fetchCat()
	};
};
