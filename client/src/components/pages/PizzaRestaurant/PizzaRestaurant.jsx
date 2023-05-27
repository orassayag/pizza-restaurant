import PizzaOrder from '../PizzaOrder/PizzaOrder';
import OrdersTable from '../../common/PizzaRestaurant/OrdersTable/OrdersTable';
import usePizzaRestaurant from '../../../hooks/usePizzaRestaurant';

export default function PizzaRestaurant() {
  const {
    isOpenModal,
    restaurantData,
    toggleModal,
    setRestaurantData,
    handleCheckoutClick,
  } = usePizzaRestaurant();

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-8">
        <div>
          <button
            type="button"
            onClick={toggleModal}
            className="bg-red-500 rounded hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
          >
            Order
          </button>
          <PizzaOrder
            isOpenModal={isOpenModal}
            toggleModal={toggleModal}
            onCheckoutClick={handleCheckoutClick}
          />
        </div>
        <OrdersTable
          orders={restaurantData}
          setRestaurantData={setRestaurantData}
        />
      </div>
    </div>
  );
}
