/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
export const selectFilter = (orders, filter) => {
  if (!orders || orders.length === 0) return [];

  const keyword = filter.keyword.toLowerCase();

  return orders.filter((order) => {
    const isInRange = filter.maxPrice
      ? (order.price >= filter.minPrice && order.price <= filter.maxPrice)
      : true;
    const matchKeyword = order.keywords ? order.keywords.includes(keyword) : true;
    // const matchName = order.name ? order.name.toLowerCase().includes(keyword) : true;
    const matchDescription = order.description
      ? order.description.toLowerCase().includes(keyword)
      : true;
    const matchBrand = order.brand ? order.brand.toLowerCase().includes(filter.brand) : true;

    return ((matchKeyword || matchDescription) && matchBrand && isInRange);
  }).sort((a, b) => {
    if (filter.sortBy === 'name-desc') {
      return a.name < b.name ? 1 : -1;
    } else if (filter.sortBy === 'name-asc') {
      return a.name > b.name ? 1 : -1;
    } else if (filter.sortBy === 'price-desc') {
      return a.price < b.price ? 1 : -1;
    }

    return a.price > b.price ? 1 : -1;
  });
};

// Select order with highest price
export const selectMax = (orders) => {
  if (!orders || orders.length === 0) return 0;

  let high = orders[0];

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].price > high.price) {
      high = orders[i];
    }
  }

  return Math.floor(high.price);
};

// Select order with lowest price
export const selectMin = (orders) => {
  if (!orders || orders.length === 0) return 0;
  let low = orders[0];

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].price < low.price) {
      low = orders[i];
    }
  }

  return Math.floor(low.price);
};