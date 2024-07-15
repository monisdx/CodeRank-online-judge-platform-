import express from 'express';
import { signin, signup, googleoauth } from '../controllers/users.ts';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/google-oauth', googleoauth);

export default router;