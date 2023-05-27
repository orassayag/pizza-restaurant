import './Header.scss';

export default function Header({
  ordersData,
}) {
  return (
    <div className="flex flex-warp justify-between">
      <div className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
        Build your master pizzas
      </div>
      <div className="orders-cart">
        <span className="fa-stack has-badge" data-count={ordersData.length}>
          <i className="fa fa-circle fa-stack-2x" />
          <i className="fa-duotone fa-pizza-slice fa-stack-1x" />
        </span>
      </div>
    </div>
  );
}
