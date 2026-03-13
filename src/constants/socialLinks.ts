import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SocialLink = {
  id: "email" | "github" | "linkedin" | "twitter";
  name: string;
  value: string;
  url: string;
  icon: LucideIcon;
};

export const CONTACT_EMAIL = "aditykbr01@gmail.com";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "email",
    name: "Email",
    value: CONTACT_EMAIL,
    url: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
  },
  {
    id: "github",
    name: "GitHub",
    value: "github.com/Adityakbr01",
    url: "https://github.com/Adityakbr01",
    icon: Github,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    value: "linkedin.com/in/aditya-kbr-3b833731b/",
    url: "https://www.linkedin.com/in/aditya-kbr-3b833731b/",
    icon: Linkedin,
  },
  {
    id: "twitter",
    name: "Twitter",
    value: "@aditya_kbr",
    url: "https://x.com/adity_kbr",
    icon: Twitter,
  },
];

export const SOCIAL_LINKS_PUBLIC = SOCIAL_LINKS.filter(
  (item) => item.id !== "email",
);
