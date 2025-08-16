import { Container, Title, Text, Box, Card, TextInput, SegmentedControl, Table, ScrollArea, Group } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import MedicalRecordItem from '../components/dashboard/MedicalRecordItem';

// Definim un tip explicit pentru un document medical
type MedicalRecord = {
  type: 'Analize' | 'Rețetă' | 'Trimitere';
  doctor: string;
  date: string;
};

// Aplicăm tipul definit pe array-ul de mock data
const medicalRecords: MedicalRecord[] = [
  { type: 'Analize', doctor: 'Dr. Ana Popescu', date: '20 August 2024' },
  { type: 'Rețetă', doctor: 'Dr. Radu Ionescu', date: '15 August 2024' },
  { type: 'Trimitere', doctor: 'Dr. Ana Popescu', date: '12 August 2024' },
  { type: 'Analize', doctor: 'Dr. Mihai Georgescu', date: '05 Iulie 2024' },
  { type: 'Rețetă', doctor: 'Dr. Ana Popescu', date: '02 Iulie 2024' },
];

const MedicalRecordsPage = () => {
  return (
    <Box style={{ backgroundColor: 'var(--mantine-color-sage-green-0)', minHeight: 'calc(100vh - 80px)' }}>
      <Container size="xl" py={60}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Title order={1} size={48} fw={700}>
            Dosarul tău Medical
          </Title>
          <Text size="lg" c="dimmed" mt="sm">
            Gestionează și vizualizează istoricul tău medical într-un singur loc.
          </Text>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card withBorder radius="md" p="xl" mt={40}>
            <Group justify="space-between" mb="xl">
              <TextInput
                placeholder="Caută un document..."
                leftSection={<MagnifyingGlass size={16} />}
                style={{ flex: 1, minWidth: '200px' }}
              />
              <SegmentedControl
                data={[
                  { label: 'Toate', value: 'all' },
                  { label: 'Analize', value: 'analize' },
                  { label: 'Rețete', value: 'retete' },
                  { label: 'Trimiteri', value: 'trimiteri' },
                ]}
              />
            </Group>
            
            <ScrollArea>
              <Table verticalSpacing="md" striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Tip Document</Table.Th>
                    <Table.Th>Emis de</Table.Th>
                    <Table.Th>Data</Table.Th>
                    <Table.Th />
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {medicalRecords.map((record, index) => (
                    <MedicalRecordItem key={index} {...record} />
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default MedicalRecordsPage;