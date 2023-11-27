/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
export const selectFilter = (settings, filter) => {
  if (!settings || settings.length === 0) return [];

  const keyword = filter.keyword.toLowerCase();

  return settings.filter((post) => {
    const isInRange = filter.maxPrice
      ? (post.price >= filter.minPrice && post.price <= filter.maxPrice)
      : true;
    const matchKeyword = post.keywords ? post.keywords.includes(keyword) : true;
    // const matchName = post.name ? post.name.toLowerCase().includes(keyword) : true;
    const matchDescription = post.description
      ? post.description.toLowerCase().includes(keyword)
      : true;
    const matchBrand = post.brand ? post.brand.toLowerCase().includes(filter.brand) : true;

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

// Select post with highest price
export const selectMax = (settings) => {
  if (!settings || settings.length === 0) return 0;

  let high = settings[0];

  for (let i = 0; i < settings.length; i++) {
    if (settings[i].price > high.price) {
      high = settings[i];
    }
  }

  return Math.floor(high.price);
};

// Select post with lowest price
export const selectMin = (settings) => {
  if (!settings || settings.length === 0) return 0;
  let low = settings[0];

  for (let i = 0; i < settings.length; i++) {
    if (settings[i].price < low.price) {
      low = settings[i];
    }
  }

  return Math.floor(low.price);
};