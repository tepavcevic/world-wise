import { useContext } from 'react';

import { AuthContext } from '../context/FakeAuthContext';

export default function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('You are trying to access state outside the provider');

  return context;
}
