import Tweet from "components/Tweet";
import { getTweet, getTweetReplies } from "lib/data.js";
import prisma from "lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import TweetReply from "@/components/TweetReply";
import Tweets from "@/components/Tweets";
import { useState } from "react";
import LoadMoreReplies from "@/components/LoadMoreReplies";

export default function SingleTweet({ tweet, initialTweetReplies }) {
  //declare variables

  const { data: session } = useSession();

  const [tweetReplies, setTweetReplies] = useState(initialTweetReplies);

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
          <TweetReply tweet={tweet} />
          {<Tweets tweets={initialTweetReplies} noLink={true} />}
          {
            <LoadMoreReplies
              tweets={tweetReplies}
              setTweets={setTweetReplies}
              parent={tweet.id}
            />
          }
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  let tweet = await getTweet(params.id, prisma);
  tweet = JSON.parse(JSON.stringify(tweet));

  let tweetreplies = await getTweetReplies(params.id, prisma, 3);
  tweetreplies = JSON.parse(JSON.stringify(tweetreplies));

  //console.log(tweetreplies);

  return {
    props: {
      tweet,
      initialTweetReplies: tweetreplies,
    },
  };
}
