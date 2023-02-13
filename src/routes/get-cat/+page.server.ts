import { PRIVATE_CAT_API_KEY } from '$env/static/private';

export const load = async () => {
	const fetchCat = async () => {
		const res = await fetch(
			`https://api.thecatapi.com/v1/images/search?api_key=${PRIVATE_CAT_API_KEY}`
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
