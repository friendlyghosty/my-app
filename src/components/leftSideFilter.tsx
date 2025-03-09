import React, { useState } from "react";

function LeftSideFilter({ onFilterChange, setSubmitButton }: any) {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    categories: [] as string[],
    sources: [] as string[],
  });

  const [errors, setErrors] = useState({
    fromDate: "",
    toDate: "",
  });

  // Validate Dates
  const validateDates = () => {
    let valid = true;
    let newErrors = { fromDate: "", toDate: "" };

    const today = new Date().toISOString().split("T")[0]; // Current Date (YYYY-MM-DD)

    if (!filters.fromDate) {
      newErrors.fromDate = "From Date is required";
      valid = false;
    } else if (filters.fromDate > today) {
      console.log("today",today)
      newErrors.fromDate = "From Date cannot be in the future";
      valid = false;
    }

    if (!filters.toDate) {
      newErrors.toDate = "To Date is required";
      valid = false;
    } else if (filters.toDate < filters.fromDate) {
      newErrors.toDate = "To Date cannot be before From Date";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle Date Change
  const handleDateChange = (type: "fromDate" | "toDate", value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));

    // Validate live changes
    setErrors((prevErrors) => ({
      ...prevErrors,
      [type]: "",
    }));
  };

  // Handle Checkbox Selection
  const handleCheckboxChange = (type: "categories" | "sources", value: string) => {
    setFilters((prevFilters) => {
      const updatedList = prevFilters[type].includes(value)
        ? prevFilters[type].filter((item) => item !== value) // Remove if already selected
        : [...prevFilters[type], value]; // Add if not selected

      return { ...prevFilters, [type]: updatedList };
    });
  };

  // Handle Submit Button Click
  const handleSubmit = () => {
    if (validateDates()) {
      setSubmitButton(true);
      onFilterChange(filters);
    }
  };

  return (
    <div className="w-1/4 h-[calc(100vh-140px)] p-4 bg-white border-2 border-blue-500 rounded-lg shadow-md fixed left-0 ml-2 z-50">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* From Date Filter */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">From Date:</label>
        <input
          type="date"
          value={filters.fromDate}
          onChange={(e) => handleDateChange("fromDate", e.target.value)}
          className="border p-2 w-full rounded cursor-text"
        />
        {errors.fromDate && <p className="text-red-500 text-sm">{errors.fromDate}</p>}
      </div>

      {/* To Date Filter */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">To Date:</label>
        <input
          type="date"
          value={filters.toDate}
          onChange={(e) => handleDateChange("toDate", e.target.value)}
          className="border p-2 w-full rounded cursor-text"
        />
        {errors.toDate && <p className="text-red-500 text-sm">{errors.toDate}</p>}
      </div>

      {/* Category Filter (Multiple Selection) */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Category:</label>
        {["technology", "business", "sports", "health"].map((category) => (
          <div key={category} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.categories.includes(category)}
              onChange={() => handleCheckboxChange("categories", category)}
              className="w-4 h-4 cursor-pointer"
            />
            <label className="text-sm">{category}</label>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </div>
  );
}

export default LeftSideFilter;
