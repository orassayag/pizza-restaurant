import PizzaOrderHelper from '../../../pages/PizzaOrder/PizzaOrder.helper';
import ToppieSelect from '../ToppieSelect/ToppieSelect';
import './Toppies.scss';

export default function Toppies({
  toppiesData,
  onSegmentationClick,
}) {
  return (
    <>
      <div className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
        Toppies
      </div>
      <div className="flex">
        {[PizzaOrderHelper.toppiesLeftColumn, PizzaOrderHelper.toppiesRightColumn]
          .map(({ id, list }) => (
            <div key={id} className="toppies-column">
              {list.map((toppie) => (
                <ToppieSelect
                  key={toppie.name}
                  selected={toppiesData[toppie.name]}
                  {...toppie}
                  onSegmentationClick={onSegmentationClick}
                />
              ))}
            </div>
          ))}
      </div>
    </>
  );
}
