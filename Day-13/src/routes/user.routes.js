import express from 'express';
import {
createUser,
getAllUsers,
getUserById,
updateUser,
deleteUser
} from '../controllers/user.controller.js';


import { validateUser } from '../validations/user.validation.js';


const router = express.Router();


router.post('/', validateUser, createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', validateUser, updateUser);
router.delete('/:id', deleteUser);


export default router;