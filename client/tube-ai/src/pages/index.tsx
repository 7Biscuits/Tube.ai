import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Spinner from "@/components/spinner";
import Summary from "@/components/summary";
import ChatWindow from "@/components/chatWindow";
import { getVideoID } from "ytdl-core";
import { getVideoInfo } from "@/helpers/getVideoInfo";
import { getSummary } from "@/helpers/getSummary";
import { getAnswer } from "@/helpers/getAnswer";
import { useState, useRef } from "react";

export default function Home(): JSX.Element {
  const hasFetchedSummary = useRef<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [channel, setChannel] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [dotPulse, setDotPulse] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<[string, boolean]>>([]);

  const handleGetSummary = async (yturl: string): Promise<void> => {
    try {
      hasFetchedSummary.current = false;
      const video_id = getVideoID(yturl);
      setSpinner(true);
      setVideoId(video_id);
      await getVideoInfo(yturl).then(({ title, channel }): void => {
        setTitle(title);
        setChannel(channel);
      });
      await getSummary(video_id).then((summary: string): void => {
        setSummary(summary);
        setSpinner(false);
        hasFetchedSummary.current = true;
      });
    } catch (e) {
      return alert(e);
    }
  };

  const handleMessage = async (message: string) => {
    try {
      setMessages((messages) => [...messages, [message, false]]);
      setDotPulse(true);
      await getAnswer(videoId, message).then((res) => {
        setMessages((messages) => [...messages, [res, true]]);
        setDotPulse(false);
      });
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <Navbar />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <div className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-[180] h-[37]" />
          <Hero btnIsDisabled={!hasFetchedSummary.current} onGetSummary={(yturl: string) => handleGetSummary(yturl)} />
        </div>
        <div>
          {spinner ? <Spinner /> : <></>}
          {hasFetchedSummary.current ? (
            <Summary
              videoId={videoId}
              title={title}
              channel={channel}
              summary={summary}
            />
          ) : (
            <></>
          )}
          <ChatWindow
            onMessage={(message: string): Promise<void> =>
              handleMessage(message)
            }
            messages={messages}
            hasReceivedAnswer={dotPulse}
          />
        </div>

        <div className="mb-32 mt-10 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Docs{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Learn{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Templates{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Deploy{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}