import { auth } from "@/auth";

export const requireUserId = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }
  return userId;
};
