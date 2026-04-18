"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setIsLoading(false);
      return;
    }

    window.location.href = "/";
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        className="h-10 w-full rounded-[6px] bg-[#1b1c1d] px-3 text-sm text-[#d1d3d6] outline-none ring-1 ring-[#323338]"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        required
        type="email"
        value={email}
      />
      <input
        className="h-10 w-full rounded-[6px] bg-[#1b1c1d] px-3 text-sm text-[#d1d3d6] outline-none ring-1 ring-[#323338]"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        required
        type="password"
        value={password}
      />
      {error ? <p className="text-sm text-[#f87171]">{error}</p> : null}
      <button
        className="w-full rounded-[6px] bg-[#2b2c30] px-3 py-2 text-sm text-[#d1d3d6] hover:bg-[#323338]"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
