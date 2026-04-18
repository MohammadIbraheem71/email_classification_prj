import { EmailClient } from "@/app/_components/email-client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserEmails, getUserProfile } from "@/lib/persistence";

const HomePage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [initialEmails, initialProfile] = await Promise.all([
    getUserEmails(session.user.id),
    getUserProfile(session.user.id),
  ]);

  return (
    <EmailClient
      initialEmails={initialEmails}
      initialProfile={initialProfile}
      userEmail={session.user.email ?? "unknown@example.com"}
    />
  );
};

export default HomePage;
