import Textbox from "./textBox";
import MessageBox from "./messageBox";
import Dots from "./dots";
import { useEffect, useRef } from "react";

type TOnMessage = (message: string) => void;

export default function ChatWindow({
  onMessage,
  messages,
  hasReceivedAnswer
}: {
  onMessage: TOnMessage;
  messages: Array<any>;
  hasReceivedAnswer: boolean;
}): JSX.Element {
  const chatboxRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!e.target.input.value) return alert("Please write a question");
    onMessage(e.target.input.value);
    e.target.input.value = "";
  }

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-[560px] h-full mt-2 items-center mx-auto justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
      <h5 className="px-5 pt-5 pb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Chat Bot
      </h5>
      <div className="p-5 overflow-y-auto" ref={chatboxRef}>
        <div className="mb-3 h-[350px] font-normal font-mono text-md p-2 w-full pb-12 text-gray-700 dark:text-gray-400">
          <MessageBox
            message="Hey there! I'm TubeBot, your video assistant. Ask me anything about this video, and I'll provide quick answers. Ready when you are!"
            isBot={true}
          />
          {messages.map(([message, isBot], index) => (
            <MessageBox key={index} message={message} isBot={isBot} />
          ))}
          {hasReceivedAnswer ? <MessageBox message={<Dots />} isBot={true} /> : null}
        </div>
      </div>
      <div className="w-max mx-auto pb-5">
        <Textbox
          handleSubmit={handleSubmit}
          label="Ask your question"
          btnText="Send"
          btnIsDisabled={hasReceivedAnswer}
        />
      </div>
    </div>
  );
}
