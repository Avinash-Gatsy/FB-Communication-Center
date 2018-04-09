import express from 'express';
import basicFeedController from './controllers/basicFeedController';
import userController from './controllers/userController';
import postController from './controllers/postController';
import commentController from './controllers/commentController';

const routes = express();

//basic routes
routes.get('/', basicFeedController.get);

//user routes
routes.post('/signup',userController.post);

//post route
routes.post('/post',postController.post);
routes.get('/posts',postController.getAll);

//comment route
routes.post('/comment',commentController.post);
export default routes;