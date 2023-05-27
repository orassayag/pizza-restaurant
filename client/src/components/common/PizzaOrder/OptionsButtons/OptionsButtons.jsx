export default function OptionsButtons({
  resetDisabled,
  addDisabled,
  onResetClick,
  onAddClick,
}) {
  return (
    <div className="flex flex-warp justify-start mt-4 h-9">
      <button
        type="button"
        onClick={onResetClick}
        className={`px-2 w-30 py-1 text-white rounded border ${resetDisabled ? 'bg-gray-300 focus:outline-none' : 'bg-gray-600 border-gray-200 text-gray-600 hover:bg-gray-500 hover:border-gray-300 transition duration-300 ease-in-out'}`}
        disabled={resetDisabled}
      >
        Reset order
      </button>
      <button
        type="button"
        className={`px-3 w-30 ml-2 py-1 rounded text-white border ${addDisabled ? 'bg-blue-300 focus:outline-none' : 'border-transparent bg-indigo-600 hover:bg-indigo-500 transition duration-300 ease-in-out'}`}
        onClick={onAddClick}
        disabled={addDisabled}
      >
        Add to cart
      </button>
    </div>
  );
}
