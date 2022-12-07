import Joi from "joi";

const schemas = {
  idSchema: Joi.object({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  userSchema: Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required()
  }),
  userOptionalSchema: Joi.object({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    email: Joi.string().email()
  }),
  newDeck: Joi.object({
    name: Joi.string().min(6).required(),
    description: Joi.string().min(10).required(),
    owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  optionalDeck: Joi.object({
    name: Joi.string().min(6),
    description: Joi.string().min(10),
    owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
  })
}

const validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body);

    if(validatorResult.error) {
      return res.status(400).json({error: validatorResult.error})
    } 
    if(!req.value) req.value = {};
    if(!req.value['body']) req.value.params = {}

    req.value.body = validatorResult.value
    next();
  }
}

const validateParam = (schema, name) => {
  return (req, res, next) => {
    const validatorResult = schema.validate({param: req.params[name]})

    if(validatorResult.error) {
      return res.status(400).json({error: validatorResult.error})
    }

    console.log("param hepler: ", req.params['deckId']);
    if(!req.value) req.value = {};
    if(!req.value['params']) req.value.params = {}
    
    req.value.params[name] = req.params[name]
    next();
  }
}

export { validateParam, schemas, validateBody }