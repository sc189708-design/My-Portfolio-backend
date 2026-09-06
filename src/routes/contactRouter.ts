import { Router } from "express";
import { sumbitContact, getContacts, deleteAllContacts } from "../controllers/contentControllers";
import { body } from "express-validator";

const router = Router();

router.post('/', [
    body('name').trim().isLength({ min: 3, max: 30 }).escape(),
    body('email').trim().isEmail().normalizeEmail(),
    body('message').trim().isLength({ min: 10, max: 1000 }).escape()
],
    sumbitContact
);
router.get('/', getContacts);
router.delete('/delete-all', deleteAllContacts);

export default router;