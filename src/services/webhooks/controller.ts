import { Request, Response } from 'express';
import { string } from 'yup';
import * as Service from './service';

const webhookUrlSchema = string().url().required();

export const registerWebhook = async (req: Request, res: Response) => {
  try {
    await webhookUrlSchema.validate(req.body.url);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }

	const newWebhook = Service.createWebHook(req.body.url);
  res.status(201).json(newWebhook);
};

export const getAllWebhooks = (req: Request, res: Response) => {
	const webhooks = Service.getAllWebhooks();
  res.json({ total: webhooks.length, data: webhooks });
};
