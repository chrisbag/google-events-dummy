import { GoogleEvent } from '../events/types';

// Interface for Webhook
export interface Webhook {
	id: number;
	url: string;
}

export enum  WebhookAction {
	CREATE = 'create',
	PATCH="patch",
	DELETE="delete"
}

export interface WebhookCallBody {
	action: WebhookAction;
	data: GoogleEvent
}
