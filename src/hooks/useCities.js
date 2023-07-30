import { useContext } from 'react';
import { CitiesContext } from '../context/CitiesContext';

export default function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error('You are trying to access state outside the provider');

  return context;
}
