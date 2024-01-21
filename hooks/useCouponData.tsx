// Importing necessary interfaces and React hooks
import { Coupon, Product } from "@/utils/interfaces";
import { useEffect, useState } from "react";

// Defining the interface for the returned data from the hook
interface CouponsInterface {
  data: Coupon[] | null; // Data can be an array of Coupon or null
  isLoading: boolean; // Loading state indicator
  error: any | null; // Error object, if any
  refetch: () => void; // Function to refetch data
}

// Custom hook for fetching and managing coupon data
const useCouponData = (): CouponsInterface => {
  // State variables for data, loading state, and errors
  const [data, setData] = useState<Coupon[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  // Function to trigger a manual refetch of data
  const refetch = () => {
    fetchData();
  };

  // Effect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Asynchronous function to fetch data from the specified URL
  const fetchData = async () => {
    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch(`/api/coupons?cuid=${sessionStorage?.getItem("cuid")}`); // Fetching data from the API
      const data = await response.json(); // Parsing the JSON response
      setData(data.coupons); // Updating the state with the fetched data
    } catch (error) {
      setError(error); // Setting the error state in case of an error
      console.error("Error fetching coupon data:", error); // Logging the error to the console
    } finally {
      setIsLoading(false); // Setting loading state back to false, regardless of success or failure
    }
  };

  // Returning the state variables and the refetch function
  return { data, isLoading, error, refetch };
};

// Exporting the custom hook for use in other components
export default useCouponData;
