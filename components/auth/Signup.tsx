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

type SignupFormProps = {
  nextPath?: string;
};

const Signupform = ({
  nextPath = "/",
}: SignupFormProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProvider, setLoadingProvider] =
    useState<OAuthProvider | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isBusy = isSubmitting || loadingProvider !== null;

  function getCallbackUrl() {
    const callbackUrl = new URL(
      "/auth/callback",
      window.location.origin
    );

    callbackUrl.searchParams.set("next", nextPath);

    return callbackUrl.toString();
  }

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);

      const username = String(
        formData.get("username") ?? ""
      ).trim();

      const email = String(
        formData.get("email") ?? ""
      ).trim().toLowerCase();

      const password = String(
        formData.get("password") ?? ""
      );

      // Basic frontend validation
      if (username.length < 3) {
        setErrorMessage(
          "Username must contain at least 3 characters."
        );
        return;
      }

      if (password.length < 8) {
        setErrorMessage(
          "Password must contain at least 8 characters."
        );
        return;
      }

      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
          emailRedirectTo: getCallbackUrl(),
        },
      });

      if (error) {
        throw error;
      }

      // If email confirmation is disabled, a session
      // may be returned immediately.
      if (data.session) {
        router.replace(nextPath);
        router.refresh();
        return;
      }

      // If email confirmation is enabled, Supabase
      // normally returns a user without an active session.
      setSuccessMessage(
        "Your account has been created. Please check your email to confirm your account."
      );

      event.currentTarget.reset();
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to create your account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleOAuth(provider: OAuthProvider) {
    setLoadingProvider(provider);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: getCallbackUrl(),
        },
      });

      if (error) {
        throw error;
      }

      // Supabase normally redirects the browser
      // to the provider after a successful request.
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
        <div className="heading">Create an Account</div>

        <form className="form" onSubmit={handleSignup}>
          <input
            required
            className="input"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            autoComplete="username"
            minLength={3}
            maxLength={30}
            disabled={isBusy}
          />

          <input
            required
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            disabled={isBusy}
          />

          <input
            required
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password (at least 8 characters)"
            autoComplete="new-password"
            minLength={8}
            disabled={isBusy}
          />

          <button
            className="login-button"
            type="submit"
            disabled={isBusy}
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {errorMessage && (
          <p className="form-message error" role="alert">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="form-message success" role="status">
            {successMessage}
          </p>
        )}

        <div className="social-account-container">
          <span className="title">Or sign up with</span>

          <div className="social-accounts">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              disabled={isBusy}
              className="social-button"
              aria-label="Sign up with Google"
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
              aria-label="Sign up with GitHub"
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
          <a href="/login">
            Already have an account? Log in
          </a>
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
    font-size: 28px;
    color: rgb(16, 137, 211);
  }

  .form {
    margin-top: 20px;
  }

  .form .input {
    width: 100%;
    box-sizing: border-box;
    background: white;
    border: 1px solid transparent;
    padding: 14px 16px;
    border-radius: 18px;
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
    opacity: 0.7;
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
    padding: 14px;
    margin: 20px auto;
    border-radius: 18px;
    box-shadow: rgba(133, 189, 215, 0.45) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .form .login-button:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  .form .login-button:active:not(:disabled) {
    transform: scale(0.98);
  }

  .form .login-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .form-message {
    margin-top: 12px;
    font-size: 13px;
    line-height: 1.6;
    overflow-wrap: anywhere;
  }

  .form-message.error {
    color: #dc2626;
  }

  .form-message.success {
    color: #15803d;
  }

  .social-account-container {
    margin-top: 25px;
  }

  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 12px;
    color: rgb(130, 130, 130);
  }

  .social-account-container .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 12px;
  }

  .social-accounts .social-button {
    min-width: 0;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
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
      font-size: 24px;
    }

    .social-accounts .social-button {
      font-size: 12px;
    }
  }
`;

export default Signupform;