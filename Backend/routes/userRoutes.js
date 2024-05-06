import express from 'express'
import { delOneUser, getAllUsers, getLoggedUser, getOneUser, loginUser, registerUser, updateOneUser } from '../controllers/userController.js';
import { loginValidator } from '../middlewares/loginValidator.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';
const userRouter = express.Router();

userRouter.get('/all', getAllUsers)
userRouter.get('/one/:id', getOneUser)

userRouter.get('/loggedInUser',loginValidator, getLoggedUser)
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.put('/one/:id',loginValidator, updateOneUser)
userRouter.delete('/one/:id',loginValidator, delOneUser)


export default userRouter;