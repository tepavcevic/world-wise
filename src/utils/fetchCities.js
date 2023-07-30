import { CITIES_LOADED, LOADING, REJECTED } from '../constants/reducer';

const fetchCities = async (baseUrl, route, dispatch) => {
  try {
    dispatch({ type: LOADING });
    const res = await fetch(`${baseUrl}/${route}`);

    if (!res.ok) {
      throw new Error("Couldn't retreive data.");
    }

    const data = await res.json();
    dispatch({ type: CITIES_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: REJECTED, payload: error.message });
    console.log(error.message);
  }
};

export default fetchCities;
