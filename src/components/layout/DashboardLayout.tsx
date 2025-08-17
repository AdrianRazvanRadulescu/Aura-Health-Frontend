import { Box } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

const DashboardLayout = () => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppHeader />
      <Box component="main" style={{ flexGrow: 1, backgroundColor: 'var(--mantine-color-gray-0)' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;