import { Request, Response } from 'express';
import Thought from '../models/Thought.js';
import User from '../models/User.js';

export const getThoughts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!thought) {
      res.status(404).json({ message: 'No thought found with that ID' });
    } else {
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const newThought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'Thought created, but no user with that ID' });
    } else {
      res.json('Thought created successfully');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: 'No thought found with that ID' });
    } else {
      res.json(updatedThought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    if (!deletedThought) {
      res.status(404).json({ message: 'No thought found with that ID' });
    } else {
      res.json({ message: 'Thought deleted' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add reaction to a thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }, // Add the reaction to the 'reactions' array
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: 'No thought found with that ID' });
    } else {
      res.json(updatedThought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Remove reaction from a thought
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Remove the reaction by reactionId
      { new: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: 'No thought or reaction found with that ID' });
    } else {
      res.json(updatedThought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
