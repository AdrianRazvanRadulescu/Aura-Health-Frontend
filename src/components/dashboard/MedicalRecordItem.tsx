import { Badge, Button, Group, Table, Text } from '@mantine/core';
import { DownloadSimple, Eye } from '@phosphor-icons/react';
import React from 'react';

interface MedicalRecordItemProps {
  type: 'Analize' | 'Rețetă' | 'Trimitere';
  doctor: string;
  date: string;
}

const badgeColors: Record<MedicalRecordItemProps['type'], string> = {
  'Analize': 'blue',
  'Rețetă': 'green',
  'Trimitere': 'orange',
};

const MedicalRecordItem: React.FC<MedicalRecordItemProps> = ({ type, doctor, date }) => {
  return (
    <Table.Tr>
      <Table.Td>
        <Badge color={badgeColors[type]} variant="light">
          {type}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fw={500}>{doctor}</Text>
      </Table.Td>
      <Table.Td>
        <Text c="dimmed">{date}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap="sm" justify='flex-end'>
          <Button variant="subtle" size="xs" leftSection={<Eye size={16} />}>
            Vizualizează
          </Button>
          <Button variant="light" size="xs" leftSection={<DownloadSimple size={16} />}>
            Descarcă
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

export default MedicalRecordItem;