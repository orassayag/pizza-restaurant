import { Reorder, AnimatePresence } from 'framer-motion';
import PizzaRestaurantHelper from '../../../pages/PizzaRestaurant/PizzaRestaurant.helper';
import TableHeader from '../TableHeader/TableHeader';
import DefaultColumn from '../DefaultColumn/DefaultColumn';
import UserColumn from '../UserColumn/UserColumn';
import StageColumn from '../StageColumn/StageColumn';

export default function OrdersTable({
  orders,
  setRestaurantData,
}) {
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <Reorder.Group values={orders} onReorder={setRestaurantData}>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {PizzaRestaurantHelper.columns.map((column) => (
                  <TableHeader
                    key={column.title}
                    {...column}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {orders.map((order) => (
                  <Reorder.Item
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    as="tr"
                    key={order._id}
                    value={order.stageLevel}
                    dragListener={false}
                  >
                    <UserColumn
                      firstName={order.user.firstName}
                      lastName={order.user.lastName}
                      gender={order.user.gender}
                      imageId={order.user.imageId}
                    />
                    {PizzaRestaurantHelper.columns
                      .filter((column) => column.isColumnType).map((column) => (
                        <DefaultColumn
                          key={column.title}
                          value={order[column.fieldName]}
                        />
                      ))}
                    <StageColumn
                      stage={order.stage}
                    />
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </Reorder.Group>
      </div>
    </div>
  );
}
