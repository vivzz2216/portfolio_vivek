var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  contactMessages: () => contactMessages,
  insertContactMessageSchema: () => insertContactMessageSchema,
  insertUserSchema: () => insertUserSchema,
  users: () => users
});
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async createContactMessage(insertMessage) {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }
  async getContactMessages() {
    return await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z } from "zod";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// server/email.ts
import nodemailer from "nodemailer";
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("Email credentials not configured");
}
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
async function sendContactNotification(data) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    // Send to yourself
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send notification email");
  }
}
async function sendAutoReply(data) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: "Thank you for contacting me",
    html: `
      <h2>Thank you for reaching out!</h2>
      <p>Dear ${data.name},</p>
      <p>I have received your message and will get back to you as soon as possible.</p>
      <p>Best regards,<br>Vivek Pillai</p>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending auto-reply:", error);
  }
}

// server/routes.ts
var contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 5,
  // 5 requests per window
  message: "Too many contact form submissions. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false
});
async function registerRoutes(app2) {
  app2.use(
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
          imgSrc: ["'self'", "data:", "https://replit.com"],
          connectSrc: [
            "'self'",
            "ws://localhost:5000",
            "ws://localhost:5173",
            "ws://127.0.0.1:5173"
          ],
          frameSrc: ["'self'", "https://replit.com"]
        }
      },
      crossOriginEmbedderPolicy: false
    })
  );
  app2.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      console.log("Request body:", req.body);
      const validatedData = insertContactMessageSchema.parse(req.body);
      console.log("Validated data:", validatedData);
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(validatedData.email)) {
        return res.status(400).json({
          message: "Please enter a valid email address."
        });
      }
      if (validatedData.message.length < 10) {
        return res.status(400).json({
          message: "Message must be at least 10 characters long."
        });
      }
      if (validatedData.message.length > 1e3) {
        return res.status(400).json({
          message: "Message must not exceed 1000 characters."
        });
      }
      const contactMessage = await storage.createContactMessage(validatedData);
      console.log("Created contact message:", contactMessage);
      await sendContactNotification(validatedData);
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
  app2.get("/api/contact-messages", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/index.ts
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
  throw err;
});
(async () => {
  const server = await registerRoutes(app);
  const port = process.env.PORT || 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    console.log(`serving on port ${port}`);
  });
})();
