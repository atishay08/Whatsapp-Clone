import express from 'express';

const Route = express.Router();

import { addUser, getUsers } from '../controller/user-controller.js';
import { newConversation } from '../controller/conversation-controller.js';

Route.post('/add',addUser);
Route.get('/users',getUsers);
Route.post('/conversation/add', newConversation);

export default Route;