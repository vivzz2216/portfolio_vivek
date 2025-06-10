import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { sendContactNotification, sendAutoReply } from './email';

// Rate limiter configuration
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many contact form submissions. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Add security headers with relaxed CSP for development
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "https://replit.com"],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com"
          ],
          fontSrc: [
            "'self'",
            "https://fonts.gstatic.com"
          ],
          imgSrc: ["'self'", 'data:', 'https://replit.com'],
          connectSrc: [
            "'self'",
            "ws://localhost:5000",
            "ws://localhost:5173",
            "ws://127.0.0.1:5173"
          ],
          frameSrc: ["'self'", "https://replit.com"],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );

  // Contact form submission endpoint
  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      console.log("Request body:", req.body);
      const validatedData = insertContactMessageSchema.parse(req.body);
      console.log("Validated data:", validatedData);
      
      // Enhanced email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(validatedData.email)) {
        return res.status(400).json({ 
          message: "Please enter a valid email address." 
        });
      }

      // Validate message length
      if (validatedData.message.length < 10) {
        return res.status(400).json({
          message: "Message must be at least 10 characters long."
        });
      }

      if (validatedData.message.length > 1000) {
        return res.status(400).json({
          message: "Message must not exceed 1000 characters."
        });
      }

      // Store the message in the database
      const contactMessage = await storage.createContactMessage(validatedData);
      console.log("Created contact message:", contactMessage);

      // Send notification email to yourself
      await sendContactNotification(validatedData);

      // Send auto-reply to the user
      await sendAutoReply({
        name: validatedData.name,
        email: validatedData.email
      });
      
      res.status(201).json({ 
        message: "Thank you! Your message has been sent successfully.",
        id: contactMessage.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors);
        return res.status(400).json({ 
          message: "Please fill in all required fields correctly.",
          errors: error.errors
        });
      }
      
      console.error("Error in POST /api/contact:", error);
      res.status(500).json({ 
        message: "An error occurred while sending your message. Please try again."
      });
    }
  });

  // Get all contact messages (for admin purposes)
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error in GET /api/contact-messages:", error);
      res.status(500).json({ 
        message: "An error occurred while retrieving messages."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}