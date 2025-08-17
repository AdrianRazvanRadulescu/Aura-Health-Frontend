// src/pages/Dashboard.tsx
import { Container, Title, Text, Box, Stack, Grid, Paper, Button, Group, Avatar, Skeleton, Center } from '@mantine/core';
import { useAuth } from '../auth/AuthContext';
import { PlusCircle, CalendarX} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentsAPI, getRecentMedicalRecordsAPI } from '../features/dashboard/api/dashboardAPI';
import { Appointment, MedicalRecord } from '../features/dashboard/types';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale/ro';

// Card Programare (similar cu cel vechi, dar adaptat)
const UpcomingAppointmentCard = ({ appointment, delay }: { appointment: Appointment; delay: number }) => {
    const appointmentDate = new Date(appointment.appointment_date);
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
            <Paper withBorder p="md" radius="md" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Avatar src={appointment.doctor.photo_url} size="lg" radius="xl" />
                <div style={{ flex: 1 }}>
                    <Text fw={700}>{appointment.doctor.name}</Text>
                    <Text size="sm" c="dimmed">{appointment.doctor.specialty}</Text>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Text size="sm" fw={500}>{format(appointmentDate, 'd MMMM yyyy', { locale: ro })}</Text>
                    <Text size="sm" c="dimmed">{appointment.appointment_time.slice(0, 5)}</Text>
                </div>
            </Paper>
        </motion.div>
    );
};

// NOU: Card pentru documente recente
const RecentDocumentCard = ({ record, delay }: { record: MedicalRecord; delay: number }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
        <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
                <div>
                    <Text fw={700}>{record.type}</Text>
                    <Text size="sm" c="dimmed">de la {record.doctor.name}</Text>
                </div>
                <Button component={Link} to="/medical-records" variant="light" size="xs">
                    Vezi
                </Button>
            </Group>
        </Paper>
    </motion.div>
);

// NOU: Grafic simulat
const ActivityChart = () => {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const mockData = [30, 50, 80, 40, 60, 20, 90]; // înălțimi procentuale

    return (
        <Paper withBorder p="lg" radius="md">
            <Title order={4} mb="md">Activitate Săptămânală</Title>
            <Group grow align="flex-end" gap="xs" h={120}>
                {mockData.map((height, index) => (
                    <Box key={index} style={{ textAlign: 'center' }}>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                            style={{ backgroundColor: 'var(--mantine-color-sage-green-5)', borderRadius: '4px', margin: '0 auto', width: '70%' }}
                        />
                        <Text size="xs" mt="xs">{days[index]}</Text>
                    </Box>
                ))}
            </Group>
        </Paper>
    );
};

const DashboardPage = () => {
    const { user } = useAuth();
    const today = format(new Date(), "eeee, d MMMM yyyy", { locale: ro });

    const { data: appointments, isLoading: isLoadingAppointments } = useQuery<Appointment[]>({
        queryKey: ['appointments'],
        queryFn: getAppointmentsAPI,
    });
    
    const { data: recentRecords, isLoading: isLoadingRecords } = useQuery<MedicalRecord[]>({
        queryKey: ['recentMedicalRecords'],
        queryFn: getRecentMedicalRecordsAPI,
    });

    return (
        <Box>
            <Container size="xl" py={{ base: 30, md: 60 }}>
                <Paper shadow="sm" p="xl" radius="md" mb="xl" style={{ backgroundImage: `linear-gradient(135deg, var(--mantine-color-sage-green-1) 0%, var(--mantine-color-sage-green-0) 100%)` }}>
                    <Text c="dimmed" tt="capitalize">{today}</Text>
                    <Title order={1} size={48} fw={700}>
                        Bine ai revenit{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
                    </Title>
                    <Text mt="sm" c="sage-green.8">Sfatul zilei: Nu uita să te hidratezi corespunzător pe parcursul zilei!</Text>
                </Paper>

                <Grid gutter="xl">
                    <Grid.Col span={{ base: 12, lg: 8 }}>
                        <Stack>
                            <Title order={2}>Programări Viitoare</Title>
                            {isLoadingAppointments ? (
                                <Stack><Skeleton height={80} radius="md" /><Skeleton height={80} radius="md" /></Stack>
                            ) : (
                                <>
                                    {appointments && appointments.length > 0 ? (
                                        appointments.map((appt, index) => <UpcomingAppointmentCard key={appt.id} appointment={appt} delay={index * 0.1} />)
                                    ) : (
                                        <Paper withBorder p="xl" radius="md" style={{ textAlign: 'center' }}>
                                            <Center><CalendarX size={48} color="var(--mantine-color-gray-5)" /></Center>
                                            <Title order={4} mt="md">Nicio programare</Title>
                                            <Text c="dimmed" mt="xs" mb="lg">Nu ai nicio programare viitoare.</Text>
                                            <Button component={Link} to="/book-appointment">Programează una acum</Button>
                                        </Paper>
                                    )}
                                </>
                            )}
                            
                            <Title order={2} mt="xl">Documente Recente</Title>
                             {isLoadingRecords ? (
                                <Stack><Skeleton height={70} radius="md" /><Skeleton height={70} radius="md" /></Stack>
                            ) : (
                                <>
                                    {recentRecords && recentRecords.length > 0 ? (
                                        recentRecords.map((record, index) => <RecentDocumentCard key={record.id} record={record} delay={index * 0.1} />)
                                    ) : (
                                        <Text c="dimmed">Nu ai documente recente în dosar.</Text>
                                    )}
                                </>
                            )}
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, lg: 4 }}>
                        <Stack>
                             <Paper component={Link} to="/book-appointment" shadow="md" p="xl" radius="md" style={{ textDecoration: 'none', background: 'var(--mantine-color-sage-green-6)', color: 'white' }}>
                                <Group>
                                    <PlusCircle size={48} />
                                    <div>
                                        <Title order={3}>Consultație Nouă</Title>
                                        <Text>Programează o întâlnire.</Text>
                                    </div>
                                </Group>
                            </Paper>
                            
                            {/* Noul Grafic */}
                            <ActivityChart />

                            <Paper component={Link} to="/medical-records" withBorder p="lg" radius="md" style={{ textDecoration: 'none' }}>
                                <Group justify="space-between">
                                    <Text fw={500}>Dosarul tău medical</Text>
                                    <Button variant="light">Vezi detalii</Button>
                                </Group>
                            </Paper>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    );
};

export default DashboardPage;