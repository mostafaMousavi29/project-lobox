import Joi from 'joi';

// Label schema: must be 1-40 chars, letters, numbers, spaces, limited punctuation
export const labelSchema = Joi.string()
  .trim()
  .min(1)
  .max(40)
  .regex(/^[\p{L}0-9 .,!()'"-]+$/u)
  .message('Label may contain letters, numbers and .,!()\'"- characters, length 1-40.')
  .required();

export const addItemSchema = Joi.object({
  label: labelSchema
});
