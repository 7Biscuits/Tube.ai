import Textbox from "./textBox";
import { useRef } from "react";

type TGetSummary = (input: string) => void;

export default function Hero({
  onGetSummary,
}: {
  onGetSummary: TGetSummary;
}): JSX.Element {
  const btnIsDisabled = useRef(true);
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!e.target?.input?.value) return alert("Please enter a youtube url");
    onGetSummary(e.target?.input?.value);
  };
  return (
    <>
      <div className="container px-6 py-5 mx-auto text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-mono font-semibold text-gray-800 dark:text-white lg:text-4xl">
            Tube.ai
          </h1>
          <p className="mt-6 text-gray-500 font-mono dark:text-gray-300">
            YouTube Summarizer and Chatbot
          </p>
          <div className="w-max mx-auto">
            <Textbox btnIsDisabled={btnIsDisabled.current} handleSubmit={handleSubmit} label="Paste youtube video url" btnText="Summarize" />
          </div>
        </div>
      </div>
    </>
  );
}