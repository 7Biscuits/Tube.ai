interface IMessage {
  message: string | JSX.Element;
  isBot: boolean;
}

export default function MessageBox({ message, isBot }: IMessage) {
  return (
    <div className="font-normal font-mono text-md p-2 w-full pb-5 text-gray-700 dark:text-gray-400">
      <span className="font-bold">{isBot ? "TubeBot 🤖: " : "You: "}</span> {message}
    </div>
  );
}