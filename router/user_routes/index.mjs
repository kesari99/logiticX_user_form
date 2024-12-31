import express from 'express';
import { createUser, deleteUser, getAllUser, getEachUser, updateUser } from '../../controller/user_controller/index.mjs';
import { upload } from '../../middleware/upload-middleware.mjs';

const router = express.Router();

router.post(
    '/create',
    upload.fields([
        { name: 'aadharImg', maxCount: 1 },
        { name: 'aadharDoc', maxCount: 1 },
    ]),
    createUser
);

router.get('/all', getAllUser);
router.get('/each/:id', getEachUser);

router.put(
    '/update/:id',
    upload.fields([
        { name: 'aadharImg', maxCount: 1 },
        { name: 'aadharDoc', maxCount: 1 },
    ]),
    updateUser
);

router.delete('/delete/:id', deleteUser);

export default router;
