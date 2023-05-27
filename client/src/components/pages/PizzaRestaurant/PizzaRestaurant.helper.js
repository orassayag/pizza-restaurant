class PizzaRestaurantHelper {
  constructor() {
    this.stageColors = {
      PENDING: 'gray',
      DOUGH: 'purple',
      TOPPING: 'blue',
      OVEN: 'yellow',
      SERVING: 'pink',
      DONE: 'green',
      ERROR: 'red',
    };
    this.genders = {
      M: 'men',
      F: 'women',
    };
    this.columns = [
      {
        title: 'User',
        isColumnType: false,
      },
      {
        title: 'Order Id',
        isColumnType: true,
        fieldName: '_id',
      },
      {
        title: 'Size',
        isColumnType: true,
        fieldName: 'size',
      },
      {
        title: 'Toppies',
        isColumnType: true,
        fieldName: 'toppiesCount',
      },
      {
        title: 'Process Time',
        isColumnType: true,
        fieldName: 'processTime',
      },
      {
        title: 'Stage',
        isColumnType: false,
      },
    ];
  }
}

export default new PizzaRestaurantHelper();
