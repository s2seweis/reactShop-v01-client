/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
export const selectFilter = (users, filter) => {
  if (!users || users.length === 0) return [];

  const keyword = filter.keyword.toLowerCase();

  return users.filter((user) => {
    const isInRange = filter.maxPrice
      ? (user.price >= filter.minPrice && user.price <= filter.maxPrice)
      : true;
    const matchKeyword = user.keywords ? user.keywords.includes(keyword) : true;
    // const matchName = user.name ? user.name.toLowerCase().includes(keyword) : true;
    const matchDescription = user.description
      ? user.description.toLowerCase().includes(keyword)
      : true;
    const matchBrand = user.brand ? user.brand.toLowerCase().includes(filter.brand) : true;

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

// Select user with highest price
export const selectMax = (users) => {
  if (!users || users.length === 0) return 0;

  let high = users[0];

  for (let i = 0; i < users.length; i++) {
    if (users[i].price > high.price) {
      high = users[i];
    }
  }

  return Math.floor(high.price);
};

// Select user with lowest price
export const selectMin = (users) => {
  if (!users || users.length === 0) return 0;
  let low = users[0];

  for (let i = 0; i < users.length; i++) {
    if (users[i].price < low.price) {
      low = users[i];
    }
  }

  return Math.floor(low.price);
};