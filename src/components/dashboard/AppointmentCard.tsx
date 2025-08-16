import { Paper, Text, Avatar, Group, Button, Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import { Calendar, Clock, VideoCamera } from '@phosphor-icons/react';
import React from 'react';

interface AppointmentCardProps {
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  avatarUrl: string;
  delay?: number;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ doctorName, specialty, date, time, avatarUrl, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <Paper withBorder p="lg" radius="md">
        <Group justify="space-between">
          <Group>
            <Avatar src={avatarUrl} size="lg" radius="xl" />
            <div>
              <Text fw={700}>{doctorName}</Text>
              <Text c="dimmed" size="sm">
                {specialty}
              </Text>
            </div>
          </Group>
          <Badge color="teal" variant="light">
            Confirmat
          </Badge>
        </Group>

        <Group justify="space-between" mt="xl">
          <Group gap="xs">
            <Calendar size={20} />
            <Text size="sm">{date}</Text>
            <Clock size={20} style={{ marginLeft: '1rem' }} />
            <Text size="sm">{time}</Text>
          </Group>
          <Button
            size="xs"
            leftSection={<VideoCamera size={16} />}
            variant="filled"
          >
            Intră în Apel
          </Button>
        </Group>
      </Paper>
    </motion.div>
  );
};

export default AppointmentCard;