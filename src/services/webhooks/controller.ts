import { Request, Response } from "express";
import { string } from "yup";

// Interface for Webhook
interface Webhook {
  id: number;
  url: string;
}

// In-memory storage for webhooks
let webhooks: Webhook[] = [];

const webhookUrlSchema = string().url().required();

export const registerWebhook = async (req: Request, res: Response) => {
  try {
    await webhookUrlSchema.validate(req.body.url);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }

  const { url } = req.body;

  const newWebhook: Webhook = {
    id: webhooks.length + 1,
    url,
  };

  webhooks.push(newWebhook);

  res.status(201).json(newWebhook);
};

export const getAllWebhooks = (req: Request, res: Response) => {
  res.json({ total: webhooks.length, data: webhooks });
};
