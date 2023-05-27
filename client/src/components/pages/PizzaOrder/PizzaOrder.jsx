import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import Header from '../../common/PizzaOrder/Header/Header';
import Sizes from '../../common/PizzaOrder/Sizes/Sizes';
import Toppies from '../../common/PizzaOrder/Toppies/Toppies';
import OptionsButtons from '../../common/PizzaOrder/OptionsButtons/OptionsButtons';
import ControlsButtons from '../../common/PizzaOrder/ControlsButtons/ControlsButtons';
import usePizzaOrder from '../../../hooks/usePizzaOrder';

export default function PizzaOrder({
  isOpenModal,
  toggleModal,
  onCheckoutClick,
}) {
  const {
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
  } = usePizzaOrder({
    toggleModal,
    onCheckoutClick,
  });

  return (
    <Transition show={isOpenModal} as={Fragment}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"> </div>
          </div>
        </Transition.Child>
        <Transition.Child
          enter="transition duration-300 ease-out transform"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition duration-150 ease-in transform"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
        >
          <div className="mdlToppings bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 flex justify-center p-8">
            <form className="w-full max-w-lg">
              <Header
                ordersData={ordersData}
              />
              <div className="flex flex-wrap -mx-3 justify-between">
                <Sizes
                  sizeData={sizeData}
                  onSizeClick={handleSizeClick}
                />
                <div className="w-full px-3">
                  <Toppies
                    toppiesData={toppiesData}
                    onSegmentationClick={handleSegmentationClick}
                  />
                  <OptionsButtons
                    resetDisabled={!validateReset()}
                    addDisabled={!validateOrder()}
                    onResetClick={handleResetClick}
                    onAddClick={handleAddClick}
                  />
                </div>
              </div>
              <ControlsButtons
                checkoutDisabled={!ordersData.length}
                onCancelClick={handleCancelClick}
                onCheckoutClick={handleCheckoutClick}
              />
            </form>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}
