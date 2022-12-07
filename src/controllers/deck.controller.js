import Deck from "../models/Deck.js";
import User from "../models/User.js";

export const DeckController = {
  getAllDeck: async(req, res, next) => {
    try {
      const decks = await Deck.find();
      return res.status(200).send(decks);
    } catch (error) {
      next(error);
    }
  },

  getDeck: async(req, res, next) => {
    const { deckId } = req.value.params;
    try {
      const deck = await Deck.findById(deckId);

      return res.status(200).send(deck);
    } catch (error) {
      next(error);
    }
  },

  newDeck: async(req, res, next) => {
    try {
      const owner = await User.findById(req.value.body.owner);

      if(!owner) {
        return res.send({
          message: "User not found"
        })
      }

      const deck = req.value.body;
      delete deck.owner;

      deck.owner = owner._id;
      const newDeck = new Deck(deck);
      await newDeck.save();

      owner.decks.push(newDeck._id);
      await owner.save();

      return res.status(201).json({
        deck: newDeck
      });

    } catch (error) {
      next(error);
    }
  },

  deleteDeck: async(req, res, next) => {
    const { deckId } = req.value.params;
    console.log(deckId);
    try {
      const result = await Deck.findByIdAndDelete(deckId);
      const owner = await User.findById(result.owner);
      owner.decks.pop(result._id);
      await owner.save();

      return res.status(202).send(result);
    } catch (error) {
      next(error)
    }
  },

  replaceDeck: async(req, res, next) => {
    const { deckId } = req.params;
    const newDeck = req.value.body;
    try {
      await Deck.findByIdAndUpdate(deckId, newDeck);
      return res.status(200).json({success: true});
    } catch (error) {
      next(error);
    }
  },

  updateDeck: async(req, res, next) => {
    const { deckId } = req.params;
    const newDeck = req.value.body;
    try {
      await Deck.findByIdAndUpdate(deckId, newDeck);
      return res.status(200).json({success: true});
    } catch (error) {
      next(error);
    }
  }
}