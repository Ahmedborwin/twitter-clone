import { useSession } from "next-auth/react";
import NewTweet from "../components/NewTweets";

export default function Home() {
  const { data: session, status } = useSession();

  return <div>{session ? <NewTweet /> : <p>You are not looged in</p>}</div>;
}
