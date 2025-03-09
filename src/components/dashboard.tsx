import React, { useState } from 'react';
import Headers from './headers';
import LeftSideFilter from './leftSideFilter';
import NewsPage from './newsPage';

function Dashboard() {
  const [filters, setFilters] = useState({});
  const [submitButton, setSubmitButton] = useState<boolean>(false) 

  return (
    <div className="min-h-screen w-[calc(100vw-180px)]">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Headers />
      </div>
<   div className='flex'>
      {/* Content */}
      <div className="  left-0 mt-20 text-[red] overflow-y-auto">
        <LeftSideFilter onFilterChange={setFilters} submitButton={submitButton}  setSubmitButton={setSubmitButton}/>
      </div>
      <div className='ml-[280px] bg-[blue] w-full p-4 text-[red] mt-16'>
      <NewsPage filters={filters} submitButton={submitButton}  setSubmitButton={setSubmitButton}/>

      </div>
      </div>
    </div>
  );
}

export default Dashboard;
