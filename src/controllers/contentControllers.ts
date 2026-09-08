import dns from 'dns';
import 'dotenv/config'
import { Request, Response } from "express";
import Contact from "../models/Contact";
import { Resend } from 'resend';
import { validationResult } from 'express-validator';

dns.setDefaultResultOrder('ipv4first');

const resend = new Resend(process.env.RESEND_API_KEY);

export const sumbitContact = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(500).json({
            false: true,
            errors: errors
        })
        return;
    }
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            res.status(400).json({ success: false, error: "all fields all required" })
            return;
        }
        const newContact = await Contact.create({ name, email, message });

        // Send yourself an email notification,
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.EMAIL_USER!,
            replyTo: email,
            subject: `New porfolio message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage${message}`
        });

        res.status(200).json({
            success: true,
            data: newContact,
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

export const deleteAllContacts = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await Contact.deleteMany({});

        res.status(200).json({
            success: true,
            message: "All contacts deleted",
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error("Error deleting contacts", error);

        res.status(500).json({
            success: false,
            error: "Failed to delete contacts",
        });
    }
};