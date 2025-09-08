import { useEffect, useState } from 'react';
import { loadFonts } from '../utils/fonts';

export const useAppLayout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  return {
    fontsLoaded,
  };
};
