import Tweet from "components/Tweet";
import { getTweet } from "lib/data.js";
import prisma from "lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import TweetReply from "@/components/TweetReply";
import { getTweetReplies } from "@/lib/data";
import Tweets from "@/components/Tweets";

export default function SingleTweet({ tweet, tweetreplies }) {
  //declare variables

  const { data: session } = useSession();

  const router = useRouter();

  if (typeof window !== "undefined" && !tweet) {
    return router.push("/");
  }
  const deleteTweet = async () => {
    await fetch("/api/utils", {
      body: JSON.stringify({
        task: "delete tweet",
        tweetId: tweet.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  return (
    <>
      <Tweet tweet={tweet} />
      {session && session.user.id === tweet.authorId && (
        <button className="border rounded" onClick={deleteTweet}>
          Delete Tweet
        </button>
      )}
      <div className="mt-10 border text-center">
        <div className="m-5">
          <TweetReply parentId={parseInt(tweet.id)} tweets={tweetreplies} />
          {!tweetreplies && <Tweets tweets={tweetreplies} />}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  let tweet = await getTweet(params.id, prisma);
  tweet = JSON.parse(JSON.stringify(tweet));

  let tweetreplies = await getTweetReplies(params.id, prisma);
  tweetreplies = JSON.parse(JSON.stringify(tweetreplies));

  //console.log(tweetreplies);

  return {
    props: {
      tweet,
      tweetreplies,
    },
  };
}
