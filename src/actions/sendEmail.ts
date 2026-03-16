"use server";

import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const resend = new Resend(RESEND_API_KEY);

export async function sendEmailAction(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const { name, email, message } = formData;

  if (!name || !email || !message) {
    return { error: "Missing required fields" };
  }

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "aditya@example.com", // Replace with your email or set in .env
      subject: `New message from ${name} on your portfolio`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (data.error) {
      return { error: data.error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
