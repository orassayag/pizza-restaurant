class PizzaOrderHelper {
  constructor() {
    this.segmentations = ['F', 'R', 'L', 'Q'];
    this.sizes = [
      {
        name: 'small',
        className: 'small',
        title: 'S',
      },
      {
        name: 'medium',
        className: 'medium',
        title: 'M',
      },
      {
        name: 'large',
        className: 'large',
        title: 'L',
      },
      {
        name: 'extra-large',
        className: 'extra-large',
        title: 'XL',
      },
    ];
    this.toppiesLeftColumn = {
      id: 'left',
      list: [
        {
          name: 'tomato',
          title: 'tomato',
          iconName: 'fa-tomato',
          price: 1,
        },
        {
          name: 'eggplant',
          title: 'eggplant',
          iconName: 'fa-eggplant',
          price: 1,
        },
        {
          name: 'greenPepper',
          title: 'green pepper',
          iconName: 'fa-pepper green',
          price: 3,
        },
        {
          name: 'redPepper',
          title: 'red pepper',
          iconName: 'fa-pepper red',
          price: 1,
        },
        {
          name: 'onion',
          title: 'onion',
          iconName: 'fa-onion',
          price: 2,
        },
        {
          name: 'pineapple',
          title: 'pineapple',
          iconName: 'fa-pineapple',
          price: 4,
        },
        {
          name: 'broccoli',
          title: 'broccoli',
          iconName: 'fa-broccoli',
          price: 2,
        },
        {
          name: 'pepperoni',
          title: 'pepperoni',
          iconName: 'fa-pepper-hot',
          price: 1,
        },
        {
          name: 'mushroom',
          title: 'mushroom',
          iconName: 'fa-mushroom',
          price: 3,
        },
      ],
    };
    this.toppiesRightColumn = {
      id: 'right',
      list: [
        {
          name: 'greenOliveBranch',
          title: 'green olive',
          iconName: 'fa-olive-branch green',
          price: 1,
        },
        {
          name: 'blackOliveBranch',
          title: 'black olive',
          iconName: 'fa-olive-branch black',
          price: 1,
        },
        {
          name: 'garlic',
          title: 'garlic',
          iconName: 'fa-garlic',
          price: 1,
        },
        {
          name: 'fish',
          title: 'anchovy',
          iconName: 'fa-fish',
          price: 4,
        },
        {
          name: 'meat',
          title: 'meat',
          iconName: 'fa-meat',
          price: 5,
        },
        {
          name: 'corn',
          title: 'corn',
          iconName: 'fa-corn',
          price: 2,
        },
        {
          name: 'sausage',
          title: 'sausage',
          iconName: 'fa-sausage',
          price: 4,
        },
        {
          name: 'bacon',
          title: 'bacon',
          iconName: 'fa-bacon',
          price: 8,
        },
        {
          name: 'swissCheese',
          title: 'sirene',
          iconName: 'fa-cheese-swiss',
          price: 2,
        },
      ],
    };
  }
}

export default new PizzaOrderHelper();
