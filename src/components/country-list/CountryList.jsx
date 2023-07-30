import Message from '../message/Message';
import Spinner from '../spinner/Spinner';
import CountryItem from '../country-item/CountryItem';
import styles from './CountryList.module.css';
import useCities from '../../hooks/useCities';

export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities?.length)
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );

  const countries = cities.reduce((acc, curr) => {
    if (!acc.length) return [{ country: curr.country, emoji: curr.emoji }];
    if (acc.some((city) => city.country === curr.country)) return acc;
    return [...acc, { country: curr.country, emoji: curr.emoji }];
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}
