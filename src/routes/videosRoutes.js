import express from 'express';
import videoController from '../controllers/videoController.js';

const routes = express.Router();

routes.get('/videos', videoController.getAllVideos);
routes.get('/videos/:id', videoController.getVideoById);
routes.post('/video', videoController.createVideo);
routes.put('/video/:id', videoController.updateVideo);
routes.delete('/video/:id', videoController.deleteVideo);

export default routes;