"use client"

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

      // Store the cuid in cache
      sessionStorage.setItem('cuid', newCuid);

      // Set the cuid in state
      setCachedCuid(newCuid);
    }
  }, []);

  return cachedCuid || '';
};

export default useCuid;
