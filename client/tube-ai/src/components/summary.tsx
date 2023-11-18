import YouTube, { YouTubeProps } from "react-youtube";

type TVideoInfo = {
  videoId: string;
  summary: string;
};

export default function Summary({ videoId, summary }: TVideoInfo): JSX.Element {
  const opts: YouTubeProps["opts"] = {
    width: "560",
    height: "315",
    allowFullScreen: false,
  };
  
  return (
    <div className="w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <YouTube videoId={videoId} opts={opts} />
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Summary
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden">
          {/* {summary} */}
          In this YouTube video, Tom teaches viewers how to greet friends in British English. He suggests using phrases like "alright," "hello, mate," "how you doing?" and "what's happening?" to sound natural when meeting British people. Tom also encourages viewers to engage with the BBC Learning English social media pages.
        </p>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ask questions
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
        </a>
      </div>
    </div>
  );
}