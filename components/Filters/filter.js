import React from 'react';

const Filter = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap flex-row-reverse gap-4 mb-4">
      {Object.keys(filters).map((key) => {
        const { type, options,level } = filters[key];
        return (
          <div key={key} className="flex flex-col">
            <label className="block text-sm font-medium mb-1">{level}</label>
            {type === 'text' && (
              <input
                type="text"
                placeholder={`${key}`}
                className="border px-2 py-1 rounded"
                onChange={(e) => onFilterChange(key, e.target.value, 'text')}
              />
            )}
            {type === 'number' && (
              <div className="flex gap-2">
                <select
                  className="border px-2 py-1 rounded"
                  onChange={(e) => onFilterChange(key, '', 'number', e.target.value)}
                >
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
                onChange={(e) => onFilterChange(key, e.target.value, 'dropdown')}
              >
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
                  onChange={(e) =>
                    onFilterChange(key, [parseInt(e.target.value) || 0, filters[key].value?.[1] || Infinity], 'range')
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="border px-2 py-1 rounded"
                  onChange={(e) =>
                    onFilterChange(key, [filters[key].value?.[0] || 0, parseInt(e.target.value) || Infinity], 'range')
                  }
                />
              </div>
            )}
            {type === 'dateRange' && (
              <div className="flex gap-2">
                <input
                  type="date"
                  className="border px-2 py-1 rounded"
                  onChange={(e) =>
                    onFilterChange(key, [e.target.value, filters[key].value?.[1] || null], 'dateRange')
                  }
                />
                <input
                  type="date"
                  className="border px-2 py-1 rounded"
                  onChange={(e) =>
                    onFilterChange(key, [filters[key].value?.[0] || null, e.target.value], 'dateRange')
                  }
                />
              </div>
            )}

        {type === 'checkbox' && (
              <div className="flex items-center gap-2">
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      onFilterChange(key, e.target.checked ? true : false, 'checkbox')
                    }
                  />{' '}
                  Show Active
                </label>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
