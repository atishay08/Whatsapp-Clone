import express from 'express';

const Route = express.Router();

import { addUser, getUsers } from '../controller/user-controller.js';
import { newConversation ,getConversation} from '../controller/conversation-controller.js';
import { newMessage,getMessages } from '../controller/message-controller.js';
import { uploadImage } from '../controller/image-controller.js';

import upload from '../utils/upload.js'; 
import { getImage } from '../controller/image-controller.js';


Route.post('/add',addUser);
Route.get('/users',getUsers);
Route.post('/conversation/add', newConversation);
Route.post('/conversation/get', getConversation);
Route.post('/message/add', newMessage);
Route.get('/message/get/:id',getMessages);
Route.post('/file/upload',upload.single('file'),uploadImage);
Route.get('/file/:filename',getImage);

export default Route;