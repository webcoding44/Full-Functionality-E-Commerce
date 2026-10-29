"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Image from "next/image";
import {
  MapPin,
  MessageSquareText,
  Phone,
  Send,
} from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";

/**
 * Responsive e-commerce footer inspired by the provided reference.
 * Replace the demo brand, contact details, links, and payment methods with your own.
 */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) return;

    // Demo behavior only: connect this to your newsletter API/provider later.
    setSubscribeMessage("Thanks for subscribing!");
    setEmail("");
  }

  return (
    <footer className="border-t border-neutral-200 bg-white text-neutral-900">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        {/* Banner + newsletter */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[16/8] min-h-48 overflow-hidden rounded-xl bg-neutral-100 sm:aspect-[16/7] lg:aspect-[16/8]">
            <Image
              src="/images/footer-beauty-banner.png"
              alt="Beauty products displayed against a soft sunset background"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="py-1">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Newsletter
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-600">
              Join our newsletter for self-care tips, skincare routines,
              exclusive offers, and early access to our latest essentials.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-5 flex flex-col gap-2 sm:flex-row"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSubscribeMessage("");
                }}
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>

            <p aria-live="polite" className="mt-2 min-h-5 text-xs text-neutral-500">
              {subscribeMessage || (
                <>
                  By subscribing, you agree to our{" "}
                  <a href="#terms" className="underline underline-offset-2 hover:text-neutral-900">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="#privacy" className="underline underline-offset-2 hover:text-neutral-900">
                    Privacy Policy
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </div>

        {/* Contact information */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <ContactCard
            icon={<MessageSquareText aria-hidden="true" size={19} />}
            title="Customer Support"
            detail="Mon–Fri, 9am–5pm EST"
            href="#contact"
          />
          <ContactCard
            icon={<Phone aria-hidden="true" size={19} />}
            title="Call Us"
            detail="+1 (555) 987-4420 (toll-free)"
            href="tel:+15559874420"
          />
          <ContactCard
            icon={<Send aria-hidden="true" size={19} />}
            title="Email Us"
            detail="support@glowly.co"
            href="mailto:support@glowly.co"
          />
          <ContactCard
            icon={<MapPin aria-hidden="true" size={19} />}
            title="Address"
            detail="125 Bloom Avenue, Suite 210, CA"
            href="#address"
          />
        </div>

        {/* Brand + navigation */}
        <div className="mt-10 grid grid-cols-1 gap-10 border-b border-neutral-200 pb-8 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-8">
          <div>
            <a href="#home" className="inline-flex items-center gap-2" aria-label="Glowly home">
              <span className="grid size-9 place-items-center rounded-lg bg-neutral-900 text-white">
                <span className="text-lg font-semibold">G</span>
              </span>
              <span className="text-xl font-semibold tracking-tight">Glowly</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-600">
              Thoughtfully chosen essentials to support your everyday routine.
              Discover products that help you feel your best.
            </p>

            <label htmlFor="footer-language" className="sr-only">
              Select language
            </label>
            <select
              id="footer-language"
              defaultValue="en"
              className="mt-5 min-w-28 cursor-pointer rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
            >
              <option value="en">English</option>
              <option value="fa">فارسی</option>
              <option value="ps">پښتو</option>
            </select>

            {/* Replace these text marks with your actual payment-provider logos if needed. */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold" aria-label="Accepted payment methods">
              <span className="italic tracking-tight text-neutral-500">amex</span>
              <span className="rounded bg-neutral-900 px-1.5 py-0.5 text-white">Pay</span>
              <span className="inline-flex items-center" aria-label="Mastercard">
                <span className="size-3.5 rounded-full bg-red-500" />
                <span className="-ml-1.5 size-3.5 rounded-full bg-amber-400/90" />
              </span>
              <span className="italic text-blue-700">PayPal</span>
              <span className="italic tracking-wide text-blue-900">VISA</span>
              <span className="rounded border border-neutral-300 px-1 py-0.5 text-[9px] tracking-widest text-neutral-600">CARD</span>
            </div>
          </div>

          <FooterLinkGroup
            title="Shop"
            links={[
              { label: "New Launches", href: "#new-launches" },
              { label: "Best Sellers", href: "#best-sellers" },
              { label: "Skin Type Routines", href: "#routines" },
              { label: "Gifts & Sets", href: "#gifts" },
            ]}
          />
          <FooterLinkGroup
            title="Support"
            links={[
              { label: "Contact Us", href: "#contact" },
              { label: "FAQs", href: "#faqs" },
              { label: "Order Tracking", href: "#tracking" },
              { label: "Returns & Exchanges", href: "#returns" },
            ]}
          />
          <FooterLinkGroup
            title="About"
            links={[
              { label: "Our Story", href: "#story" },
              { label: "Ingredients", href: "#ingredients" },
              { label: "Sustainability", href: "#sustainability" },
              { label: "Press", href: "#press" },
            ]}
          />
        </div>

        {/* Copyright + social links + policies */}
        <div className="flex flex-col gap-6 pt-6">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <p className="text-xs text-neutral-600">
              © {new Date().getFullYear()} Made with <span aria-label="love">♥</span> by Glowly.
            </p>
            <div className="flex items-center gap-2" aria-label="Social media links">
              <SocialLink href="#facebook" label="Facebook">
                <IconBrandFacebook size={16} aria-hidden="true" />
              </SocialLink>
              <SocialLink href="#twitter" label="X / Twitter">
                <IconBrandX size={16} aria-hidden="true" />
              </SocialLink>
              <SocialLink href="#instagram" label="Instagram">
                <IconBrandInstagram size={16} aria-hidden="true" />
              </SocialLink>
            </div>
          </div>

          <nav aria-label="Legal links" className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-600 sm:justify-end">
            <a href="#shipping" className="transition hover:text-neutral-950">Shipping Policy</a>
            <a href="#returns" className="transition hover:text-neutral-950">Returns Policy</a>
            <a href="#terms" className="transition hover:text-neutral-950">Terms of Service</a>
            <a href="#privacy" className="transition hover:text-neutral-950">Privacy Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

type ContactCardProps = {
  icon: ReactNode;
  title: string;
  detail: string;
  href: string;
};

function ContactCard({ icon, title, detail, href }: ContactCardProps) {
  return (
    <a
      href={href}
      className="flex min-w-0 items-start gap-3 rounded-lg border border-neutral-200 px-4 py-4 transition hover:border-neutral-400 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300"
    >
      <span className="mt-0.5 shrink-0 text-neutral-800">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm font-medium">{title}</span>
        <span className="mt-1 block break-words text-xs leading-5 text-neutral-500">{detail}</span>
      </span>
    </a>
  );
}

type FooterLink = { label: string; href: string };

type FooterLinkGroupProps = {
  title: string;
  links: FooterLink[];
};

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-sm text-neutral-600 transition hover:text-neutral-950">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

type SocialLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
};

function SocialLink({ href, label, children }: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid size-9 place-items-center rounded-full bg-neutral-900 text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
    >
      {children}
    </a>
  );
}
