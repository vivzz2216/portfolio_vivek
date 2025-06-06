import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(validatedData.email)) {
        return res.status(400).json({ 
          message: "Please enter a valid email address." 
        });
      }

      const contactMessage = await storage.createContactMessage(validatedData);
      
      res.status(201).json({ 
        message: "Thank you! Your message has been sent successfully.",
        id: contactMessage.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Please fill in all required fields.",
          errors: error.errors
        });
      }
      
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
      res.status(500).json({ 
        message: "An error occurred while retrieving messages." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
