interface IMessage {
  message: string;
  bot: boolean;
}

export default function MessageBox({ message, bot }: IMessage) {
  return (
    <div className="font-normal font-mono text-md p-2 w-full pb-5 text-gray-700 dark:text-gray-400">
      <span className="font-bold">{bot ? "🤖 TubeBot: " : "You: "}</span> {message}
    </div>
  );
}