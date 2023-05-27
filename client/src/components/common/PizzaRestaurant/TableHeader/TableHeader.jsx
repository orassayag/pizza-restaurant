export default function TableHeader({ title }) {
  return (
    <th
      className="px-5 py-5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
    >
      {title}
    </th>
  );
}
