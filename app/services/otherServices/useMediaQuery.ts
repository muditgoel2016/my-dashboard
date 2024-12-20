import { useEffect, useState } from 'react';

/**
 *
 * @param query
 * @param initialValue
 */
export default function useMediaQuery(query: string, initialValue: boolean): boolean {
  const [matches, setMatches] = useState(initialValue || false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}
