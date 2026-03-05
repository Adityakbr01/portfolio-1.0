"use client";
import React, { useState } from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socials = [
  { icon: Mail, label: "Email", value: "aditya@example.com", href: "mailto:aditya@example.com" },
  { icon: Github, label: "GitHub", value: "github.com/aditya", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/aditya", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", value: "@aditya_dev", href: "https://twitter.com" },
];

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="Contact"
      className="relative w-full bg-[#171717] py-32 overflow-hidden"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-175 h-100 rounded-full bg-amber-400/8 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="font-display uppercase text-amber-200/60 tracking-[0.3em] text-sm mb-3">
            Get In Touch
          </p>
          <h2 className="font-display font-bold uppercase text-5xl md:text-7xl text-white leading-[0.9]">
            Contact
          </h2>
          <div className="mt-4 h-px w-16 bg-amber-200/40 mx-auto" />
          <p className="mt-6 font-body text-white/40 max-w-md mx-auto">
            Have a project in mind or want to chat? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">

          {/* Socials */}
          <div className="lg:col-span-2 flex flex-col gap-4 justify-center">
            {socials.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center gap-4 p-4 rounded-xl
                  border border-white/8 bg-white/3
                  transition-all duration-200
                  hover:border-amber-200/20 hover:bg-white/6 hover:-translate-y-0.5
                "
              >
                <div className="p-2.5 rounded-lg bg-amber-200/10 text-amber-200">
                  <Icon size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="font-display uppercase text-xs tracking-widest text-white/30">{label}</span>
                  <span className="font-body text-sm text-white/55 group-hover:text-white/80 transition-colors">{value}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border border-amber-200/20 bg-amber-200/5 text-center">
                <div className="text-4xl">✉️</div>
                <h3 className="font-display uppercase text-xl text-white">Message Sent!</h3>
                <p className="font-body text-white/40 text-sm">I&apos;ll get back to you as soon as possible.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-2 font-body text-sm text-amber-200/60 hover:text-amber-200 transition-colors underline underline-offset-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display uppercase text-xs tracking-widest text-white/30">Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Aditya Kumar"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="
                        px-4 py-3 rounded-xl font-body text-sm text-white/80
                        bg-white/4 border border-white/8
                        placeholder:text-white/20
                        outline-none focus:border-amber-200/30 focus:bg-white/7
                        transition-all duration-200
                      "
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display uppercase text-xs tracking-widest text-white/30">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="hello@example.com"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="
                        px-4 py-3 rounded-xl font-body text-sm text-white/80
                        bg-white/4 border border-white/8
                        placeholder:text-white/20
                        outline-none focus:border-amber-200/30 focus:bg-white/7
                        transition-all duration-200
                      "
                    />
                  </div>
                </div>
                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-display uppercase text-xs tracking-widest text-white/30">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="
                      px-4 py-3 rounded-xl font-body text-sm text-white/80 resize-none
                      bg-white/4 border border-white/8
                      placeholder:text-white/20
                      outline-none focus:border-amber-200/30 focus:bg-white/7
                      transition-all duration-200
                    "
                  />
                </div>
                <button
                  type="submit"
                  className="
                    mt-1 w-full px-7 py-3 rounded-full font-body font-medium tracking-wide
                    bg-amber-200 text-[#171717]
                    transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                    shadow-[0_0_30px_-5px_rgba(251,191,36,0.4)]
                    hover:bg-amber-100 hover:shadow-[0_0_50px_-5px_rgba(251,191,36,0.6)]
                    hover:-translate-y-0.5 active:scale-95
                  "
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
