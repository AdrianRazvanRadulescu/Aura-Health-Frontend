import { Container, Title, Text, Box, Stack, Grid, Paper, Button, Group, Avatar, Skeleton, Center, Card, ThemeIcon, Tabs, Badge } from '@mantine/core';
import { useAuth } from '../auth/AuthContext';
import { PlusCircle, CalendarX, Heartbeat, PersonSimpleRun, Bed, Files, Pill, Calendar } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentsAPI} from '../features/dashboard/api/dashboardAPI';
import { Appointment } from '../features/dashboard/types';
import { format, formatDistanceToNow } from 'date-fns';
import { ro } from 'date-fns/locale/ro';

const NextAppointmentHero = ({ appointment }: { appointment: Appointment }) => {
    const appointmentDate = new Date(appointment.appointment_date);
    const timeToNow = formatDistanceToNow(appointmentDate, { addSuffix: true, locale: ro });

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card withBorder radius="md" p="xl">
                <Text size="sm" c="dimmed" tt="uppercase" fw={700}>Următoarea Programare ({timeToNow})</Text>
                <Group mt="lg" wrap="nowrap">
                    <Avatar src={appointment.doctor.photo_url} size={94} radius="md" />
                    <Box style={{ flex: 1 }}>
                        <Title order={3}>{appointment.doctor.name}</Title>
                        <Text c="dimmed">{appointment.doctor.specialty}</Text>
                        <Text mt="xs" fw={500}>{format(appointmentDate, 'eeee, d MMMM yyyy', { locale: ro })} la {appointment.appointment_time.slice(0, 5)}</Text>
                    </Box>
                </Group>
                <Button fullWidth mt="lg" size="md">Vezi detalii consultație</Button>
            </Card>
        </motion.div>
    );
};

const SubsequentAppointmentItem = ({ appointment }: { appointment: Appointment }) => (
    <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
            <div>
                <Text fw={500}>{appointment.doctor.name}</Text>
                <Text size="sm" c="dimmed">{format(new Date(appointment.appointment_date), 'd MMM, HH:mm', { locale: ro })}</Text>
            </div>
            <Avatar src={appointment.doctor.photo_url} size="md" radius="xl" />
        </Group>
    </Paper>
);

const HealthVitalsCard = () => (
    <Card withBorder radius="md" p="lg">
        <Title order={4} mb="md">Status Sănătate</Title>
        <Stack gap="md">
            <Group justify="space-between">
                <Group gap="sm"><ThemeIcon variant="light" color="red"><Heartbeat size={20}/></ThemeIcon><Text size="sm">Ritm Cardiac</Text></Group>
                <Text fw={500}>74 bpm</Text>
            </Group>
            <Group justify="space-between">
                <Group gap="sm"><ThemeIcon variant="light" color="blue"><PersonSimpleRun size={20}/></ThemeIcon><Text size="sm">Pași Azi</Text></Group>
                <Text fw={500}>8,241</Text>
            </Group>
            <Group justify="space-between">
                <Group gap="sm"><ThemeIcon variant="light" color="violet"><Bed size={20}/></ThemeIcon><Text size="sm">Somn (aseară)</Text></Group>
                <Text fw={500}>7h 45m</Text>
            </Group>
        </Stack>
    </Card>
);

const QuickActionsCard = () => (
     <Card withBorder radius="md" p="lg">
        <Title order={4} mb="md">Acțiuni Rapide</Title>
        <Group grow>
            <Button component={Link} to="/book-appointment" variant="light" leftSection={<PlusCircle size={20}/>}>Programare</Button>
            <Button component={Link} to="/medical-records" variant="light" leftSection={<Files size={20}/>}>Dosar</Button>
        </Group>
    </Card>
);

const MedicationReminderCard = () => (
    <Card withBorder radius="md" p="lg" bg="blue.0">
        <Group justify="space-between">
            <Title order={4}>Rețete & Memento-uri</Title>
            <ThemeIcon variant="light" color="blue" radius="xl"><Pill size={20}/></ThemeIcon>
        </Group>
        <Text size="sm" c="dimmed" mt="sm">Următoarea doză:</Text>
        <Text fw={500}>Paracetamol - Astăzi la 22:00</Text>
        <Button variant="light" color="blue" fullWidth mt="md">Vezi toate rețetele</Button>
    </Card>
);

const DashboardPage = () => {
    const { user } = useAuth();

    const { data: appointments, isLoading: isLoadingAppointments } = useQuery<Appointment[]>({ queryKey: ['appointments'], queryFn: getAppointmentsAPI });
   
    const nextAppointment = appointments && appointments.length > 0 ? appointments[0] : null;
    const otherAppointments = appointments && appointments.length > 1 ? appointments.slice(1) : [];

    return (
        <Container size="xl" py={{ base: 30, md: 60 }}>
            <Paper shadow="sm" p="xl" radius="md" mb="xl" style={{ backgroundImage: `linear-gradient(135deg, var(--mantine-color-sage-green-1) 0%, var(--mantine-color-sage-green-0) 100%)` }}>
                <Title order={1} size={48} fw={700}>
                    Bine ai revenit{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
                </Title>
                <Text mt="sm" c="sage-green.8">Sfatul zilei: O plimbare de 30 de minute poate îmbunătăți starea de spirit și sănătatea inimii.</Text>
            </Paper>

            <Grid gutter="xl">
                <Grid.Col span={{ base: 12, lg: 8 }}>
                    <Tabs defaultValue="appointments" variant="pills" radius="md">
                        <Tabs.List grow>
                            <Tabs.Tab value="appointments" leftSection={<Calendar size={20} />}>Programări Viitoare</Tabs.Tab>
                            <Tabs.Tab value="plan" leftSection={<Pill size={20} />}>Plan de Tratament</Tabs.Tab>
                        </Tabs.List>

                        <Box mt="lg">
                            <Tabs.Panel value="appointments">
                                <Stack gap="xl">
                                    {isLoadingAppointments ? <Skeleton height={220} radius="md" /> : (
                                        <>
                                            {nextAppointment ? (
                                                <NextAppointmentHero appointment={nextAppointment} />
                                            ) : (
                                                <Card withBorder p="xl" radius="md">
                                                    <Center><CalendarX size={48} color="var(--mantine-color-gray-5)" /></Center>
                                                    <Title order={4} mt="md" ta="center">Nicio programare viitoare</Title>
                                                    <Text c="dimmed" mt="xs" mb="lg" ta="center">Ești liber! Profită de timp pentru tine.</Text>
                                                    <Button component={Link} to="/book-appointment" fullWidth>Programează o consultație</Button>
                                                </Card>
                                            )}
                                        </>
                                    )}

                                    {otherAppointments.length > 0 && (
                                        <Box>
                                            <Title order={4} mb="md">De asemenea, programat</Title>
                                            <Stack><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.1 }}>
                                                {otherAppointments.map(appt => <SubsequentAppointmentItem key={appt.id} appointment={appt} />)}
                                            </motion.div></Stack>
                                        </Box>
                                    )}
                                </Stack>
                            </Tabs.Panel>
                            
                            <Tabs.Panel value="plan">
                               <Card withBorder p="xl" radius="md">
                                     <Title order={4}>Planul tău activ</Title>
                                     <Text c="dimmed" size="sm" mb="lg">Recomandări de la Dr. Elena Popescu</Text>
                                     <Stack>
                                        <Paper withBorder p="md" radius="sm">
                                            <Group justify='space-between'>
                                                <Text>Monitorizare tensiune arterială</Text>
                                                <Badge color="green" variant='light'>Zilnic</Badge>
                                            </Group>
                                        </Paper>
                                         <Paper withBorder p="md" radius="sm">
                                            <Group justify='space-between'>
                                                <Text>Medicație cardiovasculară</Text>
                                                <Badge color="blue" variant='light'>Dimineața & Seara</Badge>
                                            </Group>
                                        </Paper>
                                     </Stack>
                                </Card>
                            </Tabs.Panel>
                        </Box>
                    </Tabs>
                </Grid.Col>

                <Grid.Col span={{ base: 12, lg: 4 }}>
                    <Stack gap="xl">
                        <QuickActionsCard />
                        <HealthVitalsCard />
                        <MedicationReminderCard />
                    </Stack>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default DashboardPage;