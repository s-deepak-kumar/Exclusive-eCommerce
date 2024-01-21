import { useEffect, useState } from 'react';
import cuid from 'cuid';

const useCuid = (): string => {
  const [cachedCuid, setCachedCuid] = useState<string | null>(null);

  useEffect(() => {
    // Check if the cuid is already cached
    const cachedValue = sessionStorage.getItem('cuid');

    if (cachedValue) {
      setCachedCuid(cachedValue);
    } else {
      // Generate a new cuid
      const newCuid = cuid();

      // Set the expiration date to one year from now
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);

      // Store the cuid in cookie with an expiration date
      document.cookie = `cuid=${newCuid}; expires=${expirationDate.toUTCString()}; path=/`;

      // Set the cuid in state
      setCachedCuid(newCuid);
    }
  }, []);

  return cachedCuid || '';
};

export default useCuid;
