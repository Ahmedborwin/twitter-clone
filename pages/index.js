import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Tweets from "components/Tweets";
import prisma from "lib/prisma";
import { getTweets } from "lib/data.js";
import Link from "next/link";

export default function Index({ tweets }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const loading = status === "loading";

  if (loading) {
    return null;
  }

  if (session) {
    router.push("/home");
  }

  return (
    <div className="mt-10">
      <Tweets tweets={tweets} />
      <div className="text-center p-4 border m-4 mt-10">
        <h2 className="mb-10">Join the conversation!</h2>
        <Link
          className="border px-8 py-2 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker"
          href="/api/auth/signin"
        >
          login
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const take = 5;
  let tweets = await getTweets(prisma, take);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      tweets,
    },
  };
}
