"use client";
import React, { useState } from "react";
import { SOCIAL_LINKS } from "@/src/constants/socialLinks";
import { ArrowRight, Loader2 } from "lucide-react";
import { sendEmailAction } from "@/src/actions/sendEmail";
import { motion, Variants } from "motion/react";

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await sendEmailAction(form);

    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSent(true);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      id="Contact"
      className="relative z-20 w-full bg-[#171717] py-20 sm:py-24 md:py-32 overflow-hidden isolate"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-175 h-100 rounded-full bg-amber-400/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12 sm:mb-16 text-center">
          <p className="font-display uppercase text-amber-200/60 tracking-[0.25em] md:tracking-[0.3em] text-xs sm:text-sm mb-3">
            Get In Touch
          </p>
          <h2 className="font-display font-bold uppercase text-4xl sm:text-5xl md:text-7xl text-white leading-[0.9]">
            Contact
          </h2>
          <div className="mt-4 h-px w-16 bg-amber-200/40 mx-auto" />
          <p className="mt-6 font-body text-sm sm:text-base text-white/40 max-w-md mx-auto">
            Have a project in mind or want to chat? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">

          {/* Socials */}
          <div className="lg:col-span-2 flex flex-col gap-4 justify-center">
            {SOCIAL_LINKS.map(({ icon: Icon, name, value, url, id }) => (
              <motion.a
                key={name}
                variants={itemVariants}
                href={url}
                target={id === "email" ? undefined : "_blank"}
                rel={id === "email" ? undefined : "noopener noreferrer"}
                className="
              
                  group flex items-center gap-4 p-4 rounded-full
                  border border-white/8 bg-white/3
                  transition-all duration-200
                  hover:border-amber-200/20 hover:bg-white/6 hover:-translate-y-0.5
                "
              >
                <div className="p-2.5 rounded-lg bg-amber-200/10 text-amber-200">
                  <Icon size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="font-display uppercase text-xs tracking-widest text-white/30">{name}</span>
                  <span className="font-body text-sm text-white/55 group-hover:text-white/80 transition-colors">{value}</span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Form */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
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
                className="flex flex-col gap-4 p-5 sm:p-8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm"
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
                {error && <p className="text-red-400 text-sm font-body">{error}</p>}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    group cursor-pointer  relative flex items-center justify-center gap-2 mt-1 w-full px-7 py-3 rounded-full
                    font-body font-medium tracking-wide overflow-hidden
                    border border-amber-400/30 bg-amber-400/10 text-amber-200
                    transition-colors duration-500
                    hover:border-amber-400/50
                    hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]
                    active:scale-95 disabled:opacity-70 disabled:pointer-events-none
                  "
                >
                  {/* Ripple — expands from behind the arrow icon */}
                  <span
                    className="
                      absolute right-[36%] top-1/2 -translate-y-1/2
                      w-6 h-6 rounded-full bg-amber-400
                      scale-0 transition-transform duration-700 ease-out origin-center
                      group-hover:scale-[50]
                      z-0
                    "
                  />

                  {/* Label flips dark as ripple covers it */}
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#171717] mr-2">
                    {isLoading ? "Sending" : "Send Message"}
                  </span>

                  {/* Arrow / Spinner icon */}
                  <span
                    className="
                      relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0
                      bg-white/10 text-amber-200
                      transition-all duration-700
                      group-hover:bg-[#171717] group-hover:text-amber-400
                      group-hover:-rotate-45
                    "
                  >
                    {isLoading
                      ? <Loader2 size={14} className="animate-spin" />
                      : <ArrowRight className="w-3.5 h-3.5" />
                    }
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactSection;
