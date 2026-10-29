"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  ChevronDown,
  Heart,
  LogOut,
  MapPin,
  Menu,
  Moon,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Sun,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

export type NavbarUser = {
  name: string;
  email?: string;
};

export type NavbarLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  /** Replace with your store name or logo component/image later. */
  brandName?: string;
  brandHref?: string;
  /** Pass the signed-in user from your auth provider. Pass null for a guest. */
  user?: NavbarUser | null;
  cartItemCount?: number;
  cartHref?: string;
  searchPlaceholder?: string;
  navLinks?: NavbarLink[];
  onSearch?: (query: string) => void;
  onLogout?: () => void | Promise<void>;
  /** Connect this to a secure server action/API and re-authentication flow. */
  onDeleteAccount?: () => void | Promise<void>;
  onThemeChange?: (theme: "light" | "dark") => void;
};

const DEFAULT_NAV_LINKS: NavbarLink[] = [
  { label: "Shop All", href: "/shop" },
  { label: "All Categories", href: "/categories" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Sale", href: "/sale" },
];

// Demo identity so the dropdown is visible while you build the UI.
// Replace it with the real signed-in user, or pass user={null} for a guest.
const DEMO_USER: NavbarUser = {
  name: "Alex Morgan",
  email: "alex@example.com",
};

/**
 * Responsive e-commerce navbar.
 * - Logo + theme toggle on the left
 * - Search + category dropdown in the center on desktop
 * - Cart + icon-only account dropdown on the right
 * - Compact mobile navigation menu
 *
 * Search and account actions should be connected to your app's real routes/services.
 */
export default function Navbar({
  brandName = "YourStore",
  brandHref = "/",
  user = DEMO_USER,
  cartItemCount = 0,
  cartHref = "/cart",
  searchPlaceholder = "Search products, brands, and more...",
  navLinks = DEFAULT_NAV_LINKS,
  onSearch,
  onLogout,
  onDeleteAccount,
  onThemeChange,
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [actionError, setActionError] = useState("");
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!(event.target instanceof Node)) return;

      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target)) {
        setIsCategoryMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
        setIsCategoryMenuOpen(false);
        setIsMobileNavOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;
    const nextTheme = nextIsDark ? "dark" : "light";

    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("theme", nextTheme);
    onThemeChange?.(nextTheme);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    if (onSearch) {
      onSearch(query);
    } else {
      window.location.assign(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  async function handleLogout() {
    setActionError("");
    if (!onLogout) {
      setActionError("Connect the onLogout callback to your authentication provider.");
      return;
    }

    try {
      await onLogout();
      setIsProfileMenuOpen(false);
    } catch {
      setActionError("Could not log out. Please try again.");
    }
  }

  async function handleDeleteAccount() {
    setActionError("");
    if (!onDeleteAccount) {
      setActionError("Connect onDeleteAccount to a secure account-deletion flow first.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This may permanently remove your account data."
    );
    if (!confirmed) return;

    try {
      await onDeleteAccount();
      setIsProfileMenuOpen(false);
    } catch {
      setActionError("Account deletion failed. Please try again or contact support.");
    }
  }

  const displayName = user?.name?.trim() || "Your account";
  const initials = getInitials(displayName);
  const visibleCartCount = cartItemCount > 99 ? "99+" : cartItemCount;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 text-neutral-900 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/95 dark:text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main row */}
        <div className="grid min-h-[72px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:grid-cols-[minmax(170px,1fr)_minmax(360px,2.3fr)_minmax(100px,0.7fr)] md:gap-5">
          {/* Left: theme toggle + brand */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              title={isDark ? "Light theme" : "Dark theme"}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>

            <a
              href={brandHref}
              className="inline-flex min-w-0 items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              aria-label={`${brandName} home`}
            >
              {/* Replace this square mark with your own logo/image whenever you're ready. */}
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950">
                <span className="text-lg font-bold">{brandName.charAt(0).toUpperCase()}</span>
              </span>
              <span className="max-w-[135px] truncate text-base font-bold tracking-tight sm:max-w-none sm:text-lg">
                {brandName}
              </span>
            </a>
          </div>

          {/* Center: search + categories dropdown */}
          <div className="hidden min-w-0 items-center gap-2 md:flex">
            <form onSubmit={handleSearch} role="search" className="flex min-w-0 flex-1">
              <label htmlFor="desktop-product-search" className="sr-only">
                Search products
              </label>
              <div className="flex h-11 min-w-0 w-full items-center rounded-full border border-neutral-200 bg-neutral-50 px-4 transition focus-within:border-neutral-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:focus-within:border-neutral-500 dark:focus-within:bg-neutral-900 dark:focus-within:ring-neutral-800">
                <Search size={18} className="shrink-0 text-neutral-500" aria-hidden="true" />
                <input
                  id="desktop-product-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={searchPlaceholder}
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                />
                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="shrink-0 rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="relative shrink-0" ref={categoryMenuRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isCategoryMenuOpen}
                aria-controls="desktop-category-menu"
                onClick={() => setIsCategoryMenuOpen((open) => !open)}
                className="inline-flex h-11 items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
              >
                <span>Categories</span>
                <ChevronDown
                  size={15}
                  className={`text-neutral-500 transition-transform ${isCategoryMenuOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {isCategoryMenuOpen && (
                <div
                  id="desktop-category-menu"
                  role="menu"
                  aria-label="Shop navigation"
                  className="absolute right-0 top-[calc(100%+10px)] z-50 w-56 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-black/10 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-black/30"
                >
                  {navLinks.map((link) => (
                    <a
                      key={`desktop-category-${link.label}-${link.href}`}
                      href={link.href}
                      role="menuitem"
                      onClick={() => setIsCategoryMenuOpen(false)}
                      className={`flex items-center rounded-xl px-3 py-2.5 text-sm transition hover:bg-neutral-100 dark:hover:bg-neutral-900 ${
                        link.label.toLowerCase() === "sale"
                          ? "font-semibold text-red-600 dark:text-red-400"
                          : "text-neutral-700 dark:text-neutral-200"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: cart + profile */}
          <div className="flex items-center justify-self-end gap-1.5 sm:gap-3">
            <a
              href={cartHref}
              className="relative inline-flex size-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-800"
              aria-label={`Shopping cart, ${cartItemCount} items`}
              title="Shopping cart"
            >
              <ShoppingBag size={21} aria-hidden="true" />
              {cartItemCount > 0 && (
                <span className="absolute right-0 top-0 grid min-h-[19px] min-w-[19px] place-items-center rounded-full bg-neutral-900 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white dark:bg-white dark:text-neutral-950 dark:ring-neutral-950">
                  {visibleCartCount}
                </span>
              )}
            </a>

            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isProfileMenuOpen}
                onClick={() => {
                  setActionError("");
                  setIsProfileMenuOpen((open) => !open);
                }}
                aria-label={isProfileMenuOpen ? "Close account menu" : "Open account menu"}
                title="Account menu"
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-neutral-200 py-1 pl-1 pr-1.5 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-900"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-200 text-xs font-bold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100">
                  {user ? initials : <UserRound size={17} aria-hidden="true" />}
                </span>
                <ChevronDown
                  size={15}
                  className={`text-neutral-500 transition-transform ${isProfileMenuOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {isProfileMenuOpen && (
                <div
                  role="menu"
                  aria-label="Account menu"
                  className="absolute right-0 top-[calc(100%+12px)] z-50 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-black/10 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-black/30"
                >
                  {user ? (
                    <>
                      <div className="border-b border-neutral-100 px-4 py-4 dark:border-neutral-800">
                        <p className="truncate text-sm font-semibold">{displayName}</p>
                        {user.email && (
                          <p className="mt-1 truncate text-xs text-neutral-500 dark:text-neutral-400">
                            {user.email}
                          </p>
                        )}
                      </div>

                      <div className="p-2">
                        <AccountMenuLink href="/account" icon={<UserRound size={17} />}>
                          My Account
                        </AccountMenuLink>
                        <AccountMenuLink href="/account/orders" icon={<Package size={17} />}>
                          My Orders
                        </AccountMenuLink>
                        <AccountMenuLink href="/account/wishlist" icon={<Heart size={17} />}>
                          Wishlist
                        </AccountMenuLink>
                        <AccountMenuLink href="/account/addresses" icon={<MapPin size={17} />}>
                          Addresses
                        </AccountMenuLink>
                        <AccountMenuLink href="/account/settings" icon={<Settings size={17} />}>
                          Account Settings
                        </AccountMenuLink>
                      </div>

                      <div className="border-t border-neutral-100 p-2 dark:border-neutral-800">
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => void handleLogout()}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-neutral-700 transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-900"
                        >
                          <LogOut size={17} aria-hidden="true" />
                          Log out
                        </button>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => void handleDeleteAccount()}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 dark:text-red-400 dark:hover:bg-red-950/40"
                        >
                          <Trash2 size={17} aria-hidden="true" />
                          Delete account
                        </button>
                        {(!onLogout || !onDeleteAccount) && (
                          <p className="px-3 pb-2 pt-1 text-[11px] leading-4 text-neutral-500 dark:text-neutral-400">
                            Connect the logout and deletion callbacks before production.
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="p-4">
                      <p className="text-sm font-semibold">Welcome</p>
                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        Sign in to view orders, save favorites, and manage your account.
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <a
                          href="/login"
                          role="menuitem"
                          className="rounded-xl bg-neutral-900 px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                        >
                          Log in
                        </a>
                        <a
                          href="/register"
                          role="menuitem"
                          className="rounded-xl border border-neutral-200 px-3 py-2.5 text-center text-sm font-semibold transition hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
                        >
                          Create account
                        </a>
                      </div>
                    </div>
                  )}

                  {actionError && (
                    <p role="alert" className="border-t border-neutral-100 bg-red-50 px-4 py-3 text-xs leading-5 text-red-700 dark:border-neutral-800 dark:bg-red-950/30 dark:text-red-300">
                      {actionError}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Mobile category menu toggle */}
            <button
              type="button"
              aria-label={isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileNavOpen}
              onClick={() => setIsMobileNavOpen((open) => !open)}
              className="inline-flex size-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 md:hidden dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              {isMobileNavOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {/* Mobile search row */}
        <form onSubmit={handleSearch} role="search" className="pb-3 md:hidden">
          <label htmlFor="mobile-product-search" className="sr-only">
            Search products
          </label>
          <div className="flex h-11 items-center rounded-full border border-neutral-200 bg-neutral-50 px-4 focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:focus-within:ring-neutral-800">
            <Search size={18} className="shrink-0 text-neutral-500" aria-hidden="true" />
            <input
              id="mobile-product-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={searchPlaceholder}
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              aria-label="Submit product search"
              disabled={!searchQuery.trim()}
              className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-900 text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              <Search size={15} aria-hidden="true" />
            </button>
          </div>
        </form>

        {/* Expandable mobile navigation */}
        {isMobileNavOpen && (
          <nav aria-label="Mobile navigation" className="border-t border-neutral-100 py-2 md:hidden dark:border-neutral-800">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={`mobile-${link.label}-${link.href}`}
                  href={link.href}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={`rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-neutral-100 dark:hover:bg-neutral-900 ${
                    link.label.toLowerCase() === "sale"
                      ? "text-red-600 dark:text-red-400"
                      : "text-neutral-700 dark:text-neutral-200"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

type AccountMenuLinkProps = {
  href: string;
  icon: ReactNode;
  children: ReactNode;
};

function AccountMenuLink({ href, icon, children }: AccountMenuLinkProps) {
  return (
    <a
      href={href}
      role="menuitem"
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-700 transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-900"
    >
      <span className="text-neutral-500 dark:text-neutral-400">{icon}</span>
      <span>{children}</span>
    </a>
  );
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
