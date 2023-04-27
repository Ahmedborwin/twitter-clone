import { getTweetReplies } from "@/lib/data";
import { useRouter } from "next/router";
import Tweet from "./Tweet";

export default function TweetReply({ parentId, tweets }) {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(parentId);

    // api call using the fetch query

    await fetch("/api/tweet", {
      // body
      body: JSON.stringify({
        task: "reply tweet",
        content: "test reply to tweet",
        parent: parentId,
      }),
      // header
      headers: {
        "Content-type": "application/json",
      },
      // methodc
      method: "POST",
    });
    //router.reload(window.location.pathname);
  };
  return (
    <>
      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          <button className="border">reply to tweet</button>
        </form>
        {tweets.map((tweet, index) => (
          <Tweet key={index} tweet={tweet} />
        ))}
      </div>
    </>
  );
}
