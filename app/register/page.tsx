import Link from "next/link";
import { RegisterForm } from "@/app/register/register-form";

const RegisterPage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-[#1b1c1d] p-6">
      <section className="w-full max-w-md rounded-[12px] border border-[#323338] bg-[#232427] p-6">
        <h1 className="mb-1 text-xl font-semibold text-[#f4f5f7]">Create account</h1>
        <p className="mb-6 text-sm text-[#989ca4]">
          Register with email and password.
        </p>
        <RegisterForm />
        <p className="mt-4 text-sm text-[#989ca4]">
          Already have an account?{" "}
          <Link className="text-[#93c5fd] underline" href="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
