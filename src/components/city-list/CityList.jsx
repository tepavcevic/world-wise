import styles from './CityList.module.css';
import Spinner from '../spinner/Spinner';
import CityItem from '../city-item/CityItem';
import Message from '../message/Message';
import useCities from '../../hooks/useCities';

export default function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities?.length)
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );
  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => {
        return <CityItem key={city.id} city={city} />;
      })}
    </ul>
  );
}
