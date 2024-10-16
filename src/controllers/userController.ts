import { Request, Response } from 'express';
import User from '../models/User.js';

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends');
    if (!user) {
      res.status(404).json({ message: 'No user found with that ID' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: 'No user found with that ID' });
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
    if (!deletedUser) {
      res.status(404).json({ message: 'No user found with that ID' });
    } else {
      res.json({ message: 'User deleted' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Friend management
export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    ).populate('friends');

    if (!user) {
      res.status(404).json({ message: 'No user found with that ID' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    ).populate('friends');

    if (!user) {
      res.status(404).json({ message: 'No user found with that ID' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
