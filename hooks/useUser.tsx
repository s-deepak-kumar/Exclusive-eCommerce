import { UserInterface } from '@/utils/interfaces';
import { useEffect, useState } from 'react';

interface UserDataInterface {
  userData: UserInterface | null;
  isLoading: boolean;
  error: any | null;
}

const useUser = (): UserDataInterface => {
  const [userData, setUserData] = useState<UserInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    const url = `/api/user?cuid=${sessionStorage?.getItem("cuid")}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError(error);
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { userData, isLoading, error };
};

export default useUser;
