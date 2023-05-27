import { useEffect, useState } from 'react';
import ChanceProvider from '../providers/random.provider';
import SocketIOProvider from '../providers/socket.io.provider';

const { socket } = SocketIOProvider;

const usePizzaRestaurant = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    if (!isConnected) {
      console.log('Disconnected from socket.io server. Reconnecting...');
      socket.connect();
    }
  }, [isConnected]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setIsConnected(false);
    };
    const onOrdersStatusEvent = (orders) => {
      if (!orders?.length) {
        return;
      }
      const sortedData = orders
        .sort((a, b) => b.stageLevel - a.stageLevel);
      setRestaurantData([...sortedData]);
    };
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('ordersStatus', onOrdersStatusEvent);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('ordersStatus', onOrdersStatusEvent);
    };
  }, []);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleCheckoutClick = (orders) => {
    try {
      const data = {
        // Simulate a user already filled his/her details.
        user: ChanceProvider.createRandomUser(),
        orders,
      };
      socket.emit('incomingOrders', data);
    } catch (error) {
      // ToDo: Handler error.
      console.log(error);
      throw new Error(error.message);
    }
    toggleModal();
  };

  return {
    isConnected,
    isOpenModal,
    restaurantData,
    toggleModal,
    setRestaurantData,
    handleCheckoutClick,
  };
};

export default usePizzaRestaurant;
