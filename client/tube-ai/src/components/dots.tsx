export default function Dots(): JSX.Element {
  return (
      <div className="inline-block gap-2">
        <div className="flex items-center space-x-2 animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
  );
}