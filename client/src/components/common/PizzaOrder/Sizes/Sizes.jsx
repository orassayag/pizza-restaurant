import SizeSelect from '../SizeSelect/SizeSelect';
import PizzaOrderHelper from '../../../pages/PizzaOrder/PizzaOrder.helper';

export default function Sizes({
  sizeData,
  onSizeClick,
}) {
  return (
    <div className="w-full px-3 mb-1 md:mb-0">
      <div className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
        Size
      </div>
      <div className="flex flex-wrap w-full justify-around ml-5 mr-2 -mx-3 mb-2">
        {PizzaOrderHelper.sizes.map((size) => (
          <SizeSelect
            key={size.name}
            {...size}
            selected={sizeData}
            onSizeClick={onSizeClick}
          />
        ))}
      </div>
    </div>
  );
}
