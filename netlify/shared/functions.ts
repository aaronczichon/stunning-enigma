import { createDirectus, rest, staticToken } from '@directus/sdk';

export const initDirectus = () => {
	const serverUrl = Netlify.env.get('DIRECTUS_SERVER');
	const client = createDirectus(serverUrl!)
		.with(staticToken(Netlify.env.get('DIRECTUS_TOKEN')!))
		.with(rest());
	return client;
};
