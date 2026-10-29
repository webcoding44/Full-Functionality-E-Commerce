"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import {
  IconBrandGoogle,
  IconBrandGithub,
} from "@tabler/icons-react";

import { createClient } from "@/lib/supabase/Client";

type OAuthProvider = "google" | "github";

type LoginFormProps = {
  nextPath?: string;
};

function getSafeNextPath(path: string): string {
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("\\")
  ) {
    return "/";
  }

  return path;
}

const Loginform = ({ nextPath = "/" }: LoginFormProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProvider, setLoadingProvider] =
    useState<OAuthProvider | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const isBusy = isSubmitting || loadingProvider !== null;

  // Email and password login
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const formData = new FormData(event.currentTarget);

      const email = String(
        formData.get("email") ?? ""
      ).trim().toLowerCase();

      const password = String(
        formData.get("password") ?? ""
      );

      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.replace(getSafeNextPath(nextPath));
      router.refresh();
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Google and GitHub OAuth login
  async function handleOAuth(provider: OAuthProvider) {
    setLoadingProvider(provider);
    setErrorMessage("");

    try {
      const supabase = createClient();

      const callbackUrl = new URL(
        "/auth/callback",
        window.location.origin
      );

      callbackUrl.searchParams.set(
        "next",
        getSafeNextPath(nextPath)
      );

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: callbackUrl.toString(),
        },
      });

      if (error) {
        throw error;
      }

      // Supabase redirects the browser to the provider.
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Authentication failed. Please try again."
      );

      setLoadingProvider(null);
    }
  }

  return (
    <StyledWrapper>
      <div className="container">
        <h1 className="heading">Welcome Back</h1>

        <form className="form" onSubmit={handleLogin}>
          <input
            required
            className="input"
            type="email"
            name="email"
            id="login-email"
            autoComplete="email"
            placeholder="Email"
            aria-label="Email"
            disabled={isBusy}
          />

          <input
            required
            className="input"
            type="password"
            name="password"
            id="login-password"
            autoComplete="current-password"
            placeholder="Password"
            aria-label="Password"
            disabled={isBusy}
          />

          <button
            className="login-button"
            type="submit"
            disabled={isBusy}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        {errorMessage && (
          <p className="form-message error" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="social-account-container">
          <span className="title">Or continue with</span>

          <div className="social-accounts">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              disabled={isBusy}
              className="social-button"
              aria-label="Continue with Google"
            >
              <IconBrandGoogle size={20} stroke={1.8} />
              <span>
                {loadingProvider === "google"
                  ? "Redirecting..."
                  : "Google"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleOAuth("github")}
              disabled={isBusy}
              className="social-button"
              aria-label="Continue with GitHub"
            >
              <IconBrandGithub size={20} stroke={1.8} />
              <span>
                {loadingProvider === "github"
                  ? "Redirecting..."
                  : "GitHub"}
              </span>
            </button>
          </div>
        </div>

        <div className="agreement">
          <a href="/signup">Don't have an account? Sign up</a>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    width: 100%;
    max-width: 350px;
    box-sizing: border-box;
    background: linear-gradient(
      0deg,
      rgb(255, 255, 255) 0%,
      rgb(244, 247, 251) 100%
    );
    border-radius: 40px;
    padding: 25px 30px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.35) 0px 30px 30px -20px;
    margin: 20px;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: rgb(16, 137, 211);
  }

  .form {
    margin-top: 20px;
  }

  .form .input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    background: white;
    border: 1px solid transparent;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    color: #1f2937;
  }

  .form .input::placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input:focus {
    outline: none;
    border-color: #12b1d1;
  }

  .form .input:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(
      45deg,
      rgb(16, 137, 211) 0%,
      rgb(18, 177, 209) 100%
    );
    color: white;
    padding: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.45) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .form .login-button:hover:not(:disabled) {
    transform: scale(1.02);
  }

  .form .login-button:active:not(:disabled) {
    transform: scale(0.98);
  }

  .form .login-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .form-message {
    margin-top: 10px;
    font-size: 13px;
    line-height: 1.6;
    overflow-wrap: anywhere;
  }

  .form-message.error {
    color: #dc2626;
  }

  .social-account-container {
    margin-top: 25px;
  }

  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 12px;
    color: rgb(140, 140, 140);
  }

  .social-account-container .social-accounts {
    display: flex;
    gap: 10px;
    margin-top: 12px;
  }

  .social-accounts .social-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    flex: 1;
    min-width: 0;
    padding: 10px 8px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    background: white;
    color: #1f2937;
    font-size: 13px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .social-accounts .social-button:hover:not(:disabled) {
    background: #f3f4f6;
  }

  .social-accounts .social-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .agreement {
    display: block;
    text-align: center;
    margin-top: 18px;
  }

  .agreement a {
    text-decoration: none;
    color: #0099ff;
    font-size: 12px;
  }

  .agreement a:hover {
    text-decoration: underline;
  }

  @media (max-width: 380px) {
    .container {
      padding: 24px 20px;
      margin: 10px;
    }

    .heading {
      font-size: 25px;
    }

    .social-accounts .social-button {
      font-size: 12px;
    }
  }
`;

export default Loginform;