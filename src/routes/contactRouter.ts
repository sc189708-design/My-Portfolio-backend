import { Router } from "express";
import { sumbitContact, getContacts } from "../controllers/contentControllers";

const router = Router();

router.post('/', sumbitContact);
router.get('/', getContacts);

export default router;