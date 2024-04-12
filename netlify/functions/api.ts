import { readItem, updateItem } from '@directus/sdk';
import { Config, Context } from '@netlify/functions';
import { initDirectus } from '../shared/functions';

export default async (req: Request, context: Context) => {
	const { id } = context.params;

	try {
		const client = initDirectus();
		const item: any = await client
			.request(readItem('short_links' as any, id))
			.catch((err) => console.log(err));

		item.clicks = parseInt(item.clicks) + 1;

		await client.request(updateItem('short_links' as any, item.id, item));

		const url = item.url;

		return new Response('', {
			headers: {
				Location: url,
			},
			status: 301,
		});
	} catch (e) {
		console.log('Error receiving the item with id:', id);
		return new Response('', {
			status: 301,
			headers: {
				Location: Netlify.env.get('ERROR_REDIRECT_URL')!,
			},
		});
	}
};

export const config: Config = {
	path: '/:id',
};
