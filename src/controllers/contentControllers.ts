import { Request, Response } from "express";
import Contact from "../models/Contact";

export const sumbitContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            res.status(400).json({ success: false, error: "all fields all required" })
            return;
        }
        const newContact = await Contact.create(name, email, message);
        res.status(200).json({
            success: true,
            data: newContact
        });
    } catch (error) {
        console.error('Error saving contact', error);
        res.status(500).json({ success: false, error: 'server error plase try again later' })
    }
};

export const getContacts = async (req: Request, res: Response): Promise<void> => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        console.error('Error fetching contacts', error);
        res.status(500).json({ success: false, error: 'server error, please try again later' })
    }
};