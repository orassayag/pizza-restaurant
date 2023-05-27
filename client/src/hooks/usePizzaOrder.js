import { useState } from 'react';
import OrderModel from '../models/order.model';
import ToppieModel from '../models/toppie.model';
import PizzaOrderHelper from '../components/pages/PizzaOrder/PizzaOrder.helper';

const usePizzaOrder = ({
  toggleModal,
  onCheckoutClick,
}) => {
  const [ordersData, setOrdersData] = useState([]);
  const [toppiesData, setToppiesData] = useState({});
  const [sizeData, setSizeData] = useState('');

  const handleSizeClick = (e) => {
    const { name } = e.currentTarget;
    const updatedSizeData = sizeData && sizeData === name ? '' : name;
    setSizeData(updatedSizeData);
  };

  const handleSegmentationClick = (e) => {
    const { name, innerText } = e.target;
    const updatedToppiesData = { ...toppiesData };
    if (updatedToppiesData[name] && updatedToppiesData[name] === innerText) {
      delete updatedToppiesData[name];
    } else {
      updatedToppiesData[name] = innerText;
    }
    setToppiesData(updatedToppiesData);
  };

  const handleResetClick = () => {
    setToppiesData({});
    setSizeData('');
  };

  const handleAddClick = () => {
    setOrdersData([...ordersData, {
      size: sizeData,
      toppies: toppiesData,
    }]);
    handleResetClick();
  };

  const handleCancelClick = () => {
    toggleModal();
    setTimeout(() => {
      setOrdersData([]);
      handleResetClick();
    }, 100);
  };

  const validateReset = () => sizeData || Object.keys(toppiesData).length;

  const validateOrder = () => sizeData && Object.keys(toppiesData).length;

  const validateCheckout = async () => {
    const resultOrders = [];
    const validationPromises = [];
    for (let i = 0; i < ordersData.length; i += 1) {
      const order = ordersData[i];
      const toppies = Object.keys(order.toppies)
        .map((key) => new ToppieModel(key, order.toppies[key]));
      const size = PizzaOrderHelper.sizes.find((s) => s.name === order.size);
      const newOrder = new OrderModel(size.title, toppies);
      resultOrders.push(newOrder);
      validationPromises.push(OrderModel.validationSchema.validate(newOrder));
    }
    try {
      await Promise.all(validationPromises);
      return resultOrders;
    } catch (error) {
      // ToDo: Handle error in the checkout in on of the orders here - What to do?
      console.log('Order validation failed:', error);
      throw new Error(error.message);
    }
  };

  const handleCheckoutClick = async () => {
    const orders = await validateCheckout();
    onCheckoutClick(orders);
    setOrdersData([]);
    handleResetClick();
  };

  return {
    ordersData,
    toppiesData,
    sizeData,
    handleSizeClick,
    handleSegmentationClick,
    handleResetClick,
    handleAddClick,
    handleCheckoutClick,
    handleCancelClick,
    validateReset,
    validateOrder,
  };
};

export default usePizzaOrder;
