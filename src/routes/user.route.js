import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { validateParam, schemas, validateBody } from "../helpers/route.helper.js"

const router = express.Router();

router.get('/', UserController.getAllUser)
router.post('/', validateBody(schemas.userSchema), UserController.addUser)

router.post('/singin', UserController.singIn)
router.post('/singup', UserController.signUp)
router.get('/secret', UserController.secret)

router.get('/:id', validateParam(schemas.idSchema, 'id'), UserController.getUser)
router.put('/:id', validateParam(schemas.idSchema, 'id'), validateBody(schemas.userSchema), UserController.replaceUser)
router.patch('/:id', validateParam(schemas.idSchema, 'id'), validateBody(schemas.userOptionalSchema), UserController.updateUser)
router.delete('/:id', validateParam(schemas.idSchema, 'id'), UserController.deleteUser)

router.get('/:id/decks', validateParam(schemas.idSchema, 'id'), UserController.getUserDecks)
router.post('/:id/decks', validateParam(schemas.idSchema, 'id'), UserController.newUserDeck)

export default router;