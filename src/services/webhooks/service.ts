import { GoogleEvent } from '../events/types';
import * as WebhookClient from '../../clients/webhooks.client';
import { WebhookAction, Webhook } from './types';

// In-memory storage for webhooks
const webhooks: Webhook[] = [];

export const getAllWebhooks = () => {
	return webhooks;
};

export const createWebHook = (url: string): Webhook => {
	// idea: Webhook should be unique by url
	const newWebhook: Webhook = {
		id: webhooks.length + 1,
		url,
	};

	webhooks.push(newWebhook);
	return newWebhook;
};

export const callWebHooks = async (action: WebhookAction, googleEvent: GoogleEvent) => {
	await WebhookClient.callWebHooks(getAllWebhooks(), {
		action: action,
		data: googleEvent
	});
};
