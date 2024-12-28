import { useState } from "react";

const useFilters = (data, filters) => {
  const [activeFilters, setActiveFilters] = useState(filters);

  console.log(activeFilters);

  const applyFilters = () => {
    return data.filter((item) =>
      Object.keys(activeFilters).every((key) => {
        const filter = activeFilters[key];

        if (key === "Search" && filter.value) {
          console.log(key);
          const searchValue = filter.value.toLowerCase();
          return Object.values(item).some((value) =>
            value?.toString().toLowerCase().includes(searchValue)
          );
        }

        // if (filter.type === 'range' && filter.value) {
        //   const [min, max] = filter.value;
        //   return min <= item[key] && item[key] <= max;
        // }

        // if (filter.type === 'dropdown' && filter.value) {
        //   return filter.value === item[key];
        // }

        // if (filter.type === 'text' && filter.value) {
        //   return item[key].toString().toLowerCase().includes(filter.value.toLowerCase());
        // }

        // if (filter.type === 'number' && filter.value) {
        //   return eval(`${item[key]} ${filter.operator} ${filter.value}`);
        // }

        if (filter.type === "dateRange" && filter.value) {
          const [startDate, endDate] = filter.value;
          const itemDate = new Date(item[key]);
        //   console.log(key);
        //   console.log(itemDate);
        //   console.log(new Date(startDate));
        //   console.log(new Date(endDate));
        //   console.log(itemDate >= new Date(startDate));
        //   console.log(itemDate >= new Date(endDate));

          return (
            (!startDate || itemDate >= new Date(startDate)) &&
            (!endDate || itemDate <= new Date(endDate))
          );
        }

        // Check for checkbox (status) filters
        if (filter.type === "checkbox" && filter.value !== null) {
          console.log(item[key]);
          return item[key] === filter.value;
        }

        return true;
      })
    );
  };

  const updateFilter = (key, value, type = "text", operator = "") => {
    console.log(key,value,type,operator);
    setActiveFilters({
      ...activeFilters,
      [key]: { type, value, operator },
    });
  };

  return { filteredData: applyFilters(), updateFilter };
};

export default useFilters;
