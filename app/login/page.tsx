import Link from "next/link";
import { LoginForm } from "@/app/login/login-form";

const LoginPage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-[#1b1c1d] p-6">
      <section className="w-full max-w-md rounded-[12px] border border-[#323338] bg-[#232427] p-6">
        <h1 className="mb-1 text-xl font-semibold text-[#f4f5f7]">Login</h1>
        <p className="mb-6 text-sm text-[#989ca4]">
          Continue with your email and password.
        </p>
        <LoginForm />
        <p className="mt-4 text-sm text-[#989ca4]">
          No account yet?{" "}
          <Link className="text-[#93c5fd] underline" href="/register">
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
