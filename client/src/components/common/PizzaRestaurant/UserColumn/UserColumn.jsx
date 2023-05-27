import CONSTANTS from '../../../../config/constants.config';
import PizzaRestaurantHelper from '../../../pages/PizzaRestaurant/PizzaRestaurant.helper';
import './UserColumn.scss';

export default function UserColumn({
  firstName, lastName, gender, imageId,
}) {
  const fullName = `${firstName} ${lastName}`;
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
      <div className="flex">
        <div className="flex-shrink-0 w-10 h-10">
          <img
            className="w-full h-full rounded-full"
            src={`${CONSTANTS.THUMB.BASE_URL}thumb/${PizzaRestaurantHelper.genders[gender]}/${imageId}.jpg`}
            alt={fullName}
            title={fullName}
          />
        </div>
        <div className="ml-3">
          <p className="text-gray-900 whitespace-no-wrap user-name">
            {fullName}
          </p>
        </div>
      </div>
    </td>
  );
}
