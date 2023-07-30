import styles from './AppLayout.module.css';
import Map from '../../components/map/Map';
import Sidebar from '../../components/sidebar/Sidebar';
import User from '../../components/user/User';

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
    </div>
  );
}
