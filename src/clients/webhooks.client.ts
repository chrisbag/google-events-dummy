import got, { NormalizedOptions } from 'got';
import { WebhookCallBody, Webhook } from '../services/webhooks/types';

const client = got.extend({
	timeout: 10_000, retry: { methods: ['POST'] },
	hooks: {
		beforeRequest: [(options: NormalizedOptions) => {
			console.debug(`Calling ${options.method} ${options.url}`);
		}]
	}
});

export const callWebHooks = async (webhooks: Webhook[], body: WebhookCallBody) => {
	for (const webhook of webhooks) {
		try {
			await client.post(webhook.url, {
				json: body,
				hooks: {
					beforeRetry: [(options, error, retryCount) => {
						console.warn(`Retry n°${retryCount} call for webhook ${webhook.id}, ${body.action} event ${body.data.id} due to ${error?.message}`);
					}],
				},
			});
			console.info(`Webhook ${webhook.id} called for ${body.action} event ${body.data.id}`);
		} catch (e) {
			console.error(`Error while calling webhook ${webhook.id} (${webhook.url})`, { error: e });
			console.info(`Webhook sent data : `, body);
		}
	}
};
