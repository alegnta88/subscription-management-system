import { Router } from 'express';
import { getAllUsers, getUser } from '../controllers/user.controller.js';
import authorize from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', authorize, getUser);
userRouter.post('/', (req, res) => res.send({ title: 'Create new user' }));
userRouter.put('/:id', (req, res) => res.send({ title: `Update user` }));
userRouter.delete('/:id', (req, res) => res.send({ title: `Delete user` }));

export default userRouter;