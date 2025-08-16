import { Container, Title, Text, SimpleGrid, Box, Stack, Anchor, Loader, Center } from '@mantine/core';
import { useAuth } from '../auth/AuthContext';
import { Calendar, Heartbeat, Files, Stethoscope } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import DashboardMetricCard from '../components/dashboard/DashboardMetricCard';
import AppointmentCard from '../components/dashboard/AppointmentCard';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentsAPI } from '../features/dashboard/api/dashboardAPI';
import { Appointment } from '../features/dashboard/types';

const DashboardPage = () => {
    const { user } = useAuth();
    const today = new Date().toLocaleDateString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const { data: appointments, isLoading } = useQuery<Appointment[]>({
        queryKey: ['appointments'],
        queryFn: getAppointmentsAPI,
    });

    return (
        <Box style={{ backgroundColor: 'var(--mantine-color-sage-green-0)', minHeight: 'calc(100vh - 80px)' }}>
            <Container size="xl" py={60}>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Text c="dimmed">{today}</Text>
                    <Title order={1} size={48} fw={700}>
                        Bine ai revenit, {user?.name}!
                    </Title>
                    <Text size="lg" c="dimmed" mt="sm">
                        Iată sumarul sănătății tale. Ai grijă de tine astăzi!
                    </Text>
                </motion.div>

                <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mt={40}>
                    <Anchor component={Link} to="/book-appointment" style={{ textDecoration: 'none' }}>
                        <DashboardMetricCard
                            icon={<Stethoscope size={28} />}
                            label="Consultație Nouă"
                            value="Programează Acum"
                            color="green"
                            delay={0.1}
                        />
                    </Anchor>
                    <DashboardMetricCard
                        icon={<Calendar size={28} />}
                        label="Programări Viitoare"
                        value={isLoading ? '...' : (appointments?.length ?? 0).toString()}
                        color="sage-green"
                        delay={0.2}
                    />
                    <Anchor component={Link} to="/medical-records" style={{ textDecoration: 'none' }}>
                        <DashboardMetricCard
                            icon={<Files size={28} />}
                            label="Dosar Medical"
                            value="Vezi Documente"
                            color="yellow"
                            delay={0.3}
                        />
                    </Anchor>
                    <DashboardMetricCard
                        icon={<Heartbeat size={28} />}
                        label="Ritm Cardiac Mediu"
                        value="72 bpm"
                        color="red"
                        delay={0.4}
                    />
                </SimpleGrid>

                <Box mt={60}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        <Title order={2} mb="xl">
                            Programările Tale Viitoare
                        </Title>
                    </motion.div>
                    
                    {isLoading ? (
                        <Center h={100}>
                            <Loader color="sage-green" />
                        </Center>
                    ) : (
                        <Stack gap="lg">
                            {appointments && appointments.length > 0 ? (
                                appointments.map((appt, index) => {
                                    const date = new Date(appt.appointment_date);
                                    return (
                                        <AppointmentCard
                                            key={appt.id}
                                            doctorName={appt.doctor.name}
                                            specialty={appt.doctor.specialty}
                                            date={date.toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })}
                                            time={date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
                                            avatarUrl={appt.doctor.avatar_url}
                                            delay={0.6 + index * 0.1}
                                        />
                                    );
                                })
                            ) : (
                                <Text c="dimmed">Nu ai nicio programare viitoare.</Text>
                            )}
                        </Stack>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default DashboardPage;