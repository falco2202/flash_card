import express from "express";
import { DeckController } from "../controllers/deck.controller.js";
import { validateBody, schemas, validateParam } from "../helpers/route.helper.js";

const router = express.Router();

router.get('/:deckId', validateParam(schemas.idSchema, 'deckId'), DeckController.getDeck)
router.get('/', DeckController.getAllDeck)

router.post('/', validateBody(schemas.newDeck), DeckController.newDeck)
router.delete('/:deckId', validateParam(schemas.idSchema, 'deckId'), DeckController.deleteDeck)

router.put('/:deckId', validateParam(schemas.idSchema, 'deckId'), validateBody(schemas.newDeck), DeckController.replaceDeck)
router.patch('/:deckId', validateParam(schemas.idSchema, 'deckId'), validateBody(schemas.optionalDeck), DeckController.updateDeck)
export default router;