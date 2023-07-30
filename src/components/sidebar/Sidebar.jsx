import styles from './Sidebar.module.css';
import Logo from '../logo/Logo';
import AppNav from '../app-nav/AppNav';
import SidebarFooter from './components/SidebarFooter';
import { Outlet } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <SidebarFooter />
    </div>
  );
}
