"use client";
import Link from "next/link";
import { Github, Facebook, Twitter, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type SocialLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const socialLinks: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/Dev-vie", icon: Github },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/17pru1W5mH/?mibextid=wwXIfr",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/just.devvie",
    icon: Instagram,
  },
];

export default function Footer({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer
      className={cn(
        "mt-10 border-t bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Expense Tracker. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <nav aria-label="Legal">
              <ul className="flex items-center gap-4 text-sm">
                {mounted && (
                  <>
                    <li>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="hover:text-foreground"
                          >
                            About
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>About</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 text-sm">
                            <p className="text-muted-foreground">
                              This Expense Tracker helps you record, categorize,
                              and analyze your expenses with a clean, modern
                              interface.
                            </p>
                            <p>
                              Built with Next.js, Supabase, and Tailwind CSS,
                              the app focuses on a delightful user experience
                              and practical features.
                            </p>
                            <p>
                              Feedback is welcome—reach out through the social
                              links in the footer.
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </li>
                    <li>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="hover:text-foreground"
                          >
                            Rules
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Rules</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 text-sm">
                            <p className="text-muted-foreground">
                              Community and usage guidelines to keep things
                              friendly and productive.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                              <li>
                                Be respectful and constructive when sharing
                                feedback.
                              </li>
                              <li>
                                Use the app responsibly; avoid sharing sensitive
                                credentials.
                              </li>
                              <li>
                                Report issues or bugs via the social links in
                                the footer.
                              </li>
                            </ul>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </li>
                    <li>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="hover:text-foreground"
                          >
                            Privacy
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Privacy Policy</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 text-sm">
                            <p className="text-muted-foreground">
                              Your privacy matters. This app stores your data
                              securely in Supabase and does not sell or share
                              personal information.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                              <li>
                                Data: Expenses and profile information are
                                stored in your account database.
                              </li>
                              <li>
                                Cookies/Sessions: Used only for authentication
                                and session management.
                              </li>
                              <li>
                                Contact: Use the social links to reach out for
                                questions or removal requests.
                              </li>
                            </ul>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            <div className="h-5 w-px bg-border" aria-hidden="true" />

            <nav aria-label="Social">
              <ul className="flex items-center gap-3">
                {socialLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      className="inline-flex items-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                    >
                      <item.icon className="h-5 w-5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
