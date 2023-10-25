import Joi from 'joi';

export const userInfoSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(10)
        .required(),

    password: Joi.string()
        .required(),

    fullname: Joi.string()
    .min(3)
    .max(20)
    .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'cl'] } })
        .required(),
});
