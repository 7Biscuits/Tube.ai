interface ITextboxProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  label: string;
  btnText: string;
  btnIsDisabled: boolean;
}

export default function Textbox({
  handleSubmit,
  label,
  btnText,
  btnIsDisabled
}: ITextboxProps): JSX.Element {
  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mt-10 h-10 w-96 inline-block">
        <input
          className="peer text-gray-500 h-full bg-white w-full rounded border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          name="input"
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 font-mono text-gray-500 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-sm before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-sm after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          {label}
        </label>
      </div>
      <button
        type="submit"
        name="btn"
        disabled={btnIsDisabled}
        className="inline-block ml-2 rounded bg-neutral-50 px-6 pb-2.5 pt-2.5 text-sm font-medium font-mono leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] disabled:opacity-75"
      >
        {btnText}
      </button>
    </form>
  );
}