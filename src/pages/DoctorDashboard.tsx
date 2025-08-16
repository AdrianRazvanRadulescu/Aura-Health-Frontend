import { Container, Title, Text, Box, Table, Loader, Center, Avatar, Group } from '@mantine/core';
import { useAuth } from '../auth/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getDoctorAppointmentsAPI } from '../features/dashboard/api/dashboardAPI';
import { Appointment } from '../features/dashboard/types';

const DoctorDashboard = () => {
    const { user } = useAuth();
    const today = new Date().toLocaleDateString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const { data: appointments, isLoading } = useQuery<Appointment[]>({
        queryKey: ['doctorAppointments'],
        queryFn: getDoctorAppointmentsAPI,
    });

    return (
        <Box style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 80px)' }}>
            <Container size="xl" py={60}>
                <Text c="dimmed">{today}</Text>
                <Title order={1} size={48} fw={700}>
                    Bine ai venit, {user?.name}!
                </Title>
                <Text size="lg" c="dimmed" mt="sm" mb={40}>
                    Iată programările pacienților tăi pentru perioada următoare.
                </Text>

                {isLoading ? (
                    <Center h={200}><Loader /></Center>
                ) : (
                    <Table striped highlightOnHover withTableBorder withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Pacient</Table.Th>
                                <Table.Th>Data Programării</Table.Th>
                                <Table.Th>Ora</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {appointments?.map((appt) => {
                                const date = new Date(appt.appointment_date);
                                return (
                                    <Table.Tr key={appt.id}>
                                        <Table.Td>
                                            <Group gap="sm">
                                                <Avatar size={40} radius={40} />
                                                <div>
                                                    <Text fz="sm" fw={500}>{appt.user.name}</Text>
                                                    <Text fz="xs" c="dimmed">{appt.user.email}</Text>
                                                </div>
                                            </Group>
                                        </Table.Td>
                                        <Table.Td>{date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}</Table.Td>
                                        <Table.Td>{date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}</Table.Td>
                                    </Table.Tr>
                                );
                            })}
                        </Table.Tbody>
                    </Table>
                )}
            </Container>
        </Box>
    );
};

export default DoctorDashboard;
