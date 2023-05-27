export default function ControlsButtons({
  checkoutDisabled,
  onCancelClick,
  onCheckoutClick,
}) {
  return (
    <div className="flex flex-warp justify-end mt-4">
      <button
        type="button"
        onClick={onCancelClick}
        className="px-4 py-3 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-600 transition duration-300 ease-in-out"
      >
        Cancel
      </button>
      <button
        type="button"
        className={`px-4 ml-5 w-30 py-3 border rounded text-white ${checkoutDisabled ? 'bg-blue-300 focus:outline-none' : 'border-transparent bg-indigo-600 hover:bg-indigo-500 transition duration-300 ease-in-out'}`}
        onClick={onCheckoutClick}
        disabled={checkoutDisabled}
      >
        Checkout
      </button>
    </div>
  );
}
