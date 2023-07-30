import { createContext, useCallback, useEffect, useReducer } from 'react';

import { BASE_URL } from '../constants';
import fetchCities from '../utils/fetchCities';
import {
  CITIES_LOADED,
  CITY_LOADED,
  LOADING,
  REJECTED,
} from '../constants/reducer';

export const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case CITIES_LOADED:
      return { ...state, isLoading: false, cities: action.payload };
    case CITY_LOADED:
      return { ...state, isLoading: false, currentCity: action.payload };
    case REJECTED:
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
};

export default function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity } = state;

  useEffect(() => {
    fetchCities(BASE_URL, 'cities', dispatch);
  }, []);

  const getCity = useCallback(
    async (id) => {
      if (Number(id) === currentCity.id) return;

      const route = `cities/${id}`;
      try {
        dispatch({ type: LOADING });
        const res = await fetch(`${BASE_URL}/${route}`);
        if (!res.ok) {
          throw new Error("Couldn't retreive data.");
        }
        const data = await res.json();

        dispatch({ type: CITY_LOADED, payload: data });
      } catch (error) {
        dispatch({ type: REJECTED, payload: error.message });
        console.log(error.message);
      }
    },
    [currentCity.id]
  );

  const createCity = async (newCity) => {
    const route = `cities`;
    try {
      dispatch({ type: LOADING });
      const res = await fetch(`${BASE_URL}/${route}`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error("Couldn't submit new city.");
      }

      dispatch({ type: CITY_LOADED, payload: newCity });

      fetchCities(BASE_URL, 'cities', dispatch);
    } catch (error) {
      dispatch({ type: REJECTED, payload: error.message });
      console.log(error.message);
    }
  };

  const deleteCity = async (id) => {
    const route = `cities/${id}`;
    try {
      dispatch({ type: LOADING });
      const res = await fetch(`${BASE_URL}/${route}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error("Couldn't delete this city.");
      }

      dispatch({ type: CITY_LOADED, payload: {} });
      fetchCities(BASE_URL, 'cities', dispatch);
    } catch (error) {
      dispatch({ type: REJECTED, payload: error.message });
      console.log(error.message);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
