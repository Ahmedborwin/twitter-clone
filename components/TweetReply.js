import { getTweetReplies } from "@/lib/data";
import { useRouter } from "next/router";
import Tweet from "./Tweet";
import { useState } from "react";

export default function TweetReply({ tweet }) {
  const router = useRouter();
  const [reply, setReply] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(tweet.id);
    // api call using the fetch query

    await fetch("/api/tweet", {
      // body
      body: JSON.stringify({
        content: reply,
        parent: tweet.id,
      }),
      // header
      headers: {
        "Content-type": "application/json",
      },
      // method
      method: "POST",
    });
    router.reload(window.location.pathname);
  };
  return (
    <>
      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          <textarea
            className="border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary"
            required
            rows={1}
            columns={50}
            name="tweetreply"
            value={reply}
            onChange={(e) => {
              setReply(e.target.value);
            }}
            placeholder="Reply to tweet"
          ></textarea>
          <div className="flex">
            <div className="flex-1 mb-5">
              <button className="border float-right ml-2 px-8 py-2 mt-0 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover">
                Reply
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
