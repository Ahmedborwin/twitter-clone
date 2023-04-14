import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (session) {
    router.push("/home");
  }

  return (
    <div>
      <h1>Home page</h1>
      <Link href="/api/auth/signin">login</Link>
    </div>
  );
}
