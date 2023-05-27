export default function DefaultColumn({ value }) {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
      <p className="text-gray-600 whitespace-no-wrap">
        {value || 'N/A'}
      </p>
    </td>
  );
}
