'use client';
import React, { useState } from 'react';

// Custom Hook for Filtering Logic
const useFilters = (data, filters) => {
  const [activeFilters, setActiveFilters] = useState(filters);
  console.log(activeFilters);

  const applyFilters = () => {
    return data.filter((item) =>
      Object.keys(activeFilters).every((key) => {
        const filter = activeFilters[key];

        // Check for range filters
        if (filter.type === 'range' && filter.value) {
          const [min, max] = filter.value;
          return min <= item[key] && item[key] <= max;
        }

        // Check for dropdown filters
        if (filter.type === 'dropdown' && filter.value) {
          return filter.value === item[key];
        }

        // Check for text filters
        if (filter.type === 'text' && filter.value) {
          return item[key].toString().toLowerCase().includes(filter.value.toLowerCase());
        }

        // Check for number filters (less than, greater than)
        if (filter.type === 'number' && filter.value) {
          return eval(`${item[key]} ${filter.operator} ${filter.value}`);
        }

        // Check for date range filters
        if (filter.type === 'dateRange' && filter.value) {
          const [startDate, endDate] = filter.value;
          const itemDate = new Date(item[key]);
          return (!startDate || itemDate >= new Date(startDate)) &&
                 (!endDate || itemDate <= new Date(endDate));
        }

        return true;
      })
    );
  };

  const updateFilter = (key, value, type = 'text', operator = '') => {
    setActiveFilters({
      ...activeFilters,
      [key]: { type, value, operator },
    });
  };

  return { filteredData: applyFilters(), updateFilter };
};






















// Reusable Filter Component
const Filter = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {Object.keys(filters).map((key) => {
        const { type, options } = filters[key];
        return (
          <div key={key} className="flex flex-col">
            <label className="block text-sm font-medium mb-1">{key}</label>
            {type === 'text' && (
              <input
                type="text"
                placeholder={`Filter by ${key}`}
                className="border px-2 py-1 rounded"
                onChange={(e) => onFilterChange(key, e.target.value, 'text')}
              />
            )}
            {type === 'number' && (
              <div className="flex gap-2">
                <select
                  className="border px-2 py-1 rounded"
                  onChange={(e) => onFilterChange(key, '', 'number', e.target.value)}>
                  <option value="">Select</option>
                  <option value="<">Less than</option>
                  <option value=">">Greater than</option>
                  <option value="===">Equal</option>
                </select>
                <input
                  type="number"
                  placeholder="Value"
                  className="border px-2 py-1 rounded"
                  onChange={(e) => onFilterChange(key, e.target.value, 'number')}
                />
              </div>
            )}
            {type === 'dropdown' && (
              <select
                className="border px-2 py-1 rounded"
                onChange={(e) => onFilterChange(key, e.target.value, 'dropdown')}>
                <option value="">All</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {type === 'range' && (
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="border px-2 py-1 rounded"
                  onChange={(e) => {
                    onFilterChange(key, [parseInt(e.target.value) || 0, filters[key].value?.[1] || Infinity], 'range');
                  }}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="border px-2 py-1 rounded"
                  onChange={(e) => {
                    onFilterChange(key, [filters[key].value?.[0] || 0, parseInt(e.target.value) || Infinity], 'range');
                  }}
                />
              </div>
            )}
            {type === 'dateRange' && (
              <div className="flex gap-2">
                <input
                  type="date"
                  className="border px-2 py-1 rounded"
                  onChange={(e) => {
                    onFilterChange(
                      key,
                      [e.target.value, filters[key].value?.[1] || null],
                      'dateRange'
                    );
                  }}
                />
                <input
                  type="date"
                  className="border px-2 py-1 rounded"
                  onChange={(e) => {
                    onFilterChange(
                      key,
                      [filters[key].value?.[0] || null, e.target.value],
                      'dateRange'
                    );
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};






























// Example Usage
const FilterableTable = () => {
    const data = [
      { id: 1, name: 'Alice', age: 25, city: 'New York', date: '2023-12-01', department: 'HR' },
      { id: 2, name: 'Bob', age: 30, city: 'Los Angeles', date: '2023-11-15', department: 'IT' },
      { id: 3, name: 'Charlie', age: 35, city: 'Chicago', date: '2023-10-20', department: 'Finance' },
      { id: 4, name: 'David', age: 22, city: 'New York', date: '2023-12-05', department: 'IT' },
    ];
  
    const { filteredData, updateFilter } = useFilters(data, {
      name: { type: 'text', value: '' }, // First text filter
      age: { type: 'range', value: [0, 100] },
      city: { type: 'dropdown', value: '', options: ['New York', 'Los Angeles', 'Chicago'] },
      date: { type: 'dateRange', value: [null, null] },
      department: { type: 'dropdown', value: '', options: ['HR', 'IT', 'Finance'] }, // New dropdown filter
      keyword: { type: 'text', value: '' }, // New text filter
    });
  
    return (
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Filterable Table</h1>
  
        {/* Filters */}
        <Filter
          filters={{
            name: { type: 'text' },
            age: { type: 'range' },
            city: { type: 'dropdown', options: ['New York', 'Los Angeles', 'Chicago'] },
            date: { type: 'dateRange' },
            department: { type: 'dropdown', options: ['HR', 'IT', 'Finance'] }, // Add the new dropdown filter
            keyword: { type: 'text' }, // Add the new text filter
          }}
          onFilterChange={updateFilter}
        />
  
        {/* Filtered Data */}
        <table className="border-collapse w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">City</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Department</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.age}</td>
                <td className="border p-2">{item.city}</td>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default FilterableTable;
