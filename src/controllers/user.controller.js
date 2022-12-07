import User from "../models/User.js"
import Deck from "../models/Deck.js"

export const UserController = {
  getAllUser: async(req, res, next) => {
    try {
      const users = await User.find();
      return res.status(200).send(users);
    } catch (error) {
      next(error)
    }
  },
  
  getUser: async (req, res, next) => {
    const { id } = req.value.params; 
    try {
      const user = await User.findById(id);
      return res.status(200).send(user);
    } catch (error) {
      next(error)
    }
  },

  getUserDecks: async(req, res, next) => {
    const { id } = req.value.params;

    try {
      const user = await User.findById(id).populate('decks');
      return res.status(200).json({
        decks: user.decks
      })
    } catch (error) {
      next(error)
    }
  },

  newUserDeck: async(req, res, next) => {
    const { id } = req.value.params;
    const newDeck = new Deck(req.value.body);

    try {
      const user = await User.findById(id);

      // Assign user as a deck's owner
      newDeck.owner = user;
      await newDeck.save();

      // Add deck to user's decks array
      user.decks.push(newDeck._id);
      await user.save();

      return res.status(201).json({deck: newDeck});
    } catch (error) {
      next(err);
    }
  },

  addUser: async(req, res, next) => {
    const newUser = new User(req.value.body);
    try {
      const user = await newUser.save();
      res.status(201).send(user);
    } catch (error) {
      next(error)
    }
  }, 

  deleteUser: async(req, res, next) => {
    const {id} = req.value.params
    try {
      const result = await User.findByIdAndDelete(id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async(req, res, next) => {
    const { id } = req.value.params;
    const newUser = req.value.body;
    try {
      await User.findByIdAndUpdate(id, newUser);
      return res.status(201).json({success: true})
    } catch (error) {
      next(error);
    }
  },

  replaceUser: async(req, res, next) => {
    const { id } = req.value.params;
    const newUser = req.value.body;
    try {
      await User.findByIdAndUpdate(id, newUser);
      return res.status(200).json({success: true})
    } catch (error) {
      next(error);
    }
  },

  secret: async(req, res, next) => {
    try {
      
    } catch (error) {
      
    }
  },

  singIn: async(req, res, next) => {
    try {
      
    } catch (error) {
      
    }
  },

  signUp: async(req, res, next) => {
    try {
      
    } catch (error) {
      
    }
  }
}