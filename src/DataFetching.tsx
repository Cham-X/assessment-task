import React, { useState, useEffect } from 'react'
import CustomButton from './components/custom-button/CustomButton';

interface PaginatedDataProps {
  apiEndpoint?: string; // Optional API endpoint, default is provided
}

const DataFetching: React.FC<PaginatedDataProps> = (
  {
    apiEndpoint = "https://jsonplaceholder.typicode.com/posts",
  }
) => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); // Default total pages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 10; // Number of items per page

  // Fetch data from the API
  const fetchData = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiEndpoint}?_page=${page}&_limit=${pageSize}`
      );
      const result = await response.json();

      setData(result);
      setTotalPages(10); // JSONPlaceholder does not provide total pages, so it's hardcoded here
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the current page changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="pagination-container max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Paginated Data</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display data */}
      <ul className='text-left w-[100%]'>
        {data.map((item: any) => (
          <li
            key={item.id}
            className="border-b py-2 text-gray-800 text-4"
          >
            {item.title}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <CustomButton
          color="default"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </CustomButton>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <CustomButton
          color="primary"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </CustomButton>
      </div>
    </div>
  )
}

export default DataFetching
