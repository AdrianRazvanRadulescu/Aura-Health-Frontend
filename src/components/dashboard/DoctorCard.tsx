import { Card, Avatar, Text, Button, Group } from '@mantine/core';
import { Doctor } from '../../features/dashboard/types';

interface DoctorCardProps {
  doctor: Doctor;
  onBook: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBook }) => {
  return (
    <Card withBorder radius="md" p="xl">
      <Group>
        <Avatar src={doctor.avatar_url} size={120} radius="md" />
        <div style={{ flex: 1 }}>
          <Text fz="lg" fw={700}>
            {doctor.name}
          </Text>
          <Text fz="sm" c="dimmed" mt={2}>
            {doctor.specialty}
          </Text>
          <Button onClick={onBook} fullWidth mt="md">
            Programează Acum
          </Button>
        </div>
      </Group>
    </Card>
  );
};

export default DoctorCard;