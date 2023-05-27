import PizzaRestaurantHelper from '../../../pages/PizzaRestaurant/PizzaRestaurant.helper';

export default function StageColumn({ stage }) {
  const color = PizzaRestaurantHelper.stageColors[stage];
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-40">
      <span
        className="relative inline-block px-3 py-1 font-semibold text-white-900 leading-tight"
      >
        <span
          aria-hidden
          className={`absolute inset-0 bg-${color}-200 opacity-50 rounded-full`}
          style={{ backgroundColor: color }}
        />
        <span className="relative">{stage}</span>
      </span>
    </td>
  );
}
