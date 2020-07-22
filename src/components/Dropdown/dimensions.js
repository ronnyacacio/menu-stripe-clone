import { useState, useCallback, useLayoutEffect } from 'react';

const getDimensions = (element) => element.getBoundingClientRect();

export function useDimensions(responsive = true) {
  const [dimensions, setDimensions] = useState(null);
  const [element, setElement] = useState(null);

  const hook = useCallback((element) => setElement(element), []);

  useLayoutEffect(() => {
    if (element)
      (function updateDimensions() {
        window.requestAnimationFrame(() => {
          setDimensions(getDimensions(element));
        });
      })();

    if (responsive) {
      window.addEventListener('resize', updateDimensions);

      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  return [hook, dimensions, element];
}
