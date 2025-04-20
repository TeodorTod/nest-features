import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  DB_PORT: Joi.number().port().default(5432),
  DB_PASSWORD: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_HOST: Joi.string().hostname().required(),
  DB_TYPE: Joi.string().valid('postgres').required(),
  DB_SYNC: Joi.boolean().required(),
  DB_AUTOLOAD: Joi.boolean().required(),
  SECRET_KEY: Joi.string().required(),
});