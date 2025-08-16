import { Paper, Text, Title, ThemeIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import React from 'react';

interface DashboardMetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  delay?: number;
}

const DashboardMetricCard: React.FC<DashboardMetricCardProps> = ({ icon, label, value, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Paper withBorder p="lg" radius="md" style={{ display: 'flex', alignItems: 'center' }}>
        <ThemeIcon color={color} size={48} radius="md" mr="md">
          {icon}
        </ThemeIcon>
        <div>
          <Text c="dimmed" size="sm" fw={500}>
            {label}
          </Text>
          <Title order={3} fw={700}>
            {value}
          </Title>
        </div>
      </Paper>
    </motion.div>
  );
};

export default DashboardMetricCard;