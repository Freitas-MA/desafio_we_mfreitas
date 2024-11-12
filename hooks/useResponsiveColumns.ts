import { useWindowDimensions } from 'react-native';

export const useResponsiveColumns = () => {
  const { width } = useWindowDimensions();
  
  if (width >= 1024) return 3;
  if (width >= 768) return 2; 
  return 1; 
};