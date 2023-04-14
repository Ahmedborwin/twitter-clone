import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div>
      {session ? <p>you are logged in</p> : <p>You are not looged in</p>}
    </div>
  );
}
