import { Router } from 'express';
import {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from '../controllers/userController.js';
import {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../controllers/thoughtController.js';

const router = Router();

// User routes
router.route('/users').get(getUsers).post(createUser);
router.route('/users/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/users/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// Thought routes
router.route('/thoughts').get(getThoughts).post(createThought);
router.route('/thoughts/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/thoughts/:thoughtId/reactions').post(addReaction);
router.route('/thoughts/:thoughtId/reactions/:reactionId').delete(removeReaction);

export default router;
