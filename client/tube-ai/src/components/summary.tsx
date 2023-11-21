import YouTube, { YouTubeProps } from "react-youtube";

interface ISummaryProps {
  videoId: string;
  title: string;
  channel: string;
  summary: string;
  onToggle: () => void;
};

export default function Summary({
  videoId,
  title,
  channel,
  summary,
  onToggle
}: ISummaryProps): JSX.Element {
  const opts: YouTubeProps["opts"] = {
    width: "550",
    height: "315",
  };

  return (
    <div className="w-[560px] mt-2 items-center mx-auto justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
      <div className="w-[550px] h-[315px] mx-auto mt-1">
        <YouTube className="" videoId={videoId} opts={opts} />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-mono font-semibold tracking-tight text-gray-900 dark:text-white">
          Summary
        </h5>
        <h5 className="mb-2 text-md font-mono tracking-tight text-gray-900 dark:text-white">
          <span className="font-semibold">Title: </span> {title} <br />
          <span className="font-semibold">Channel: </span> {channel}
        </h5>
        <div className="mb-3 font-normal text-lg p-2 w-full pb-12 text-gray-700 dark:text-gray-400">
          {summary}
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ipsam delectus explicabo. In, quos quibusdam tempora iste doloremque natus praesentium! */}
        </div>
        <div
          onClick={onToggle}
          className="inline-flex ml-2 rounded bg-neutral-50 px-4 pb-2.5 pt-2.5 text-sm font-medium font-mono leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] cursor-pointer"
        >
          Ask questions
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2 mt-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}