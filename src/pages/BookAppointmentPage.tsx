import { useState, useEffect } from 'react';
import { Box, Container, Title, Text, SimpleGrid, Paper, Avatar, Button, Group, LoadingOverlay, Select, TextInput, Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { CheckCircle } from '@phosphor-icons/react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

// Interfață pentru datele unui medic
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  description: string;
  photo_url: string;
  price: number;
}

const BookAppointmentPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();

  // Fetch doctors from the backend API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/doctors');
        // Verificăm dacă răspunsul este un obiect cu o cheie 'data' (comun în Laravel)
        if (Array.isArray(response.data)) {
          setDoctors(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          // Cazul în care datele sunt în response.data.data (ex: la paginare)
          setDoctors(response.data.data);
        } else {
            console.error("API response is not an array:", response.data);
            setDoctors([]); // Setăm un array gol pentru a preveni eroarea
        }
        // --- FINAL MODIFICARE ---

      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // ... restul codului rămâne neschimbat ...
  const form = useForm({
    initialValues: {
      date: null,
      time: '',
      notes: '',
    },
    validate: {
      date: (value) => (value ? null : 'Data este obligatorie'),
      time: (value) => (value ? null : 'Ora este obligatorie'),
    },
  });

  const handleBookAppointment = async (values: typeof form.values) => {
    if (!selectedDoctor || !user) return;

    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/appointments', {
        doctor_id: selectedDoctor.id,
        user_id: user.id,
        appointment_date: values.date,
        appointment_time: values.time,
        notes: values.notes,
      }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setShowSuccess(true);
      form.reset();
      setSelectedDoctor(null);
    } catch (error) {
      console.error('Failed to book appointment:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (showSuccess) {
    return (
        <Container size="sm" py={100} ta="center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <CheckCircle size={80} color="var(--mantine-color-teal-6)" />
                <Title order={2} mt="lg">Programare realizată cu succes!</Title>
                <Text c="dimmed" mt="sm">Veți primi un email de confirmare în curând. Puteți vizualiza detaliile în dashboard-ul dumneavoastră.</Text>
                <Button onClick={() => setShowSuccess(false)} mt="xl" size="md">
                    Programează o altă consultație
                </Button>
            </motion.div>
        </Container>
    );
  }

  return (
    <Box>
      <LoadingOverlay visible={loading} />
      <Box bg="gray.0" py={{ base: 60, md: 100 }}>
        <Container>
          <Title ta="center">Programează o Consultație</Title>
          <Text ta="center" size="lg" c="dimmed" mt="md" maw={600} mx="auto">
            Alege un specialist, selectează o dată și o oră convenabilă și realizează programarea în doar câteva minute.
          </Text>
        </Container>
      </Box>

      <Container size="lg" py={{ base: 60, md: 100 }}>
        {selectedDoctor ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Title order={2} ta="center" mb="xl">Completează detaliile pentru Dr. {selectedDoctor.name}</Title>
            <Paper withBorder shadow="md" p="xl" radius="md" maw={500} mx="auto">
              <form onSubmit={form.onSubmit(handleBookAppointment)}>
                <Stack>
                  <DatePickerInput
                    label="Data consultației"
                    placeholder="Alege o dată"
                    minDate={new Date()}
                    {...form.getInputProps('date')}
                  />
                  <Select
                    label="Ora consultației"
                    placeholder="Alege o oră"
                    data={['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']}
                    {...form.getInputProps('time')}
                  />
                  <TextInput
                    label="Note suplimentare (opțional)"
                    placeholder="Simptome, istoric, etc."
                    {...form.getInputProps('notes')}
                  />
                  <Group justify="right" mt="md">
                    <Button variant="default" onClick={() => setSelectedDoctor(null)}>Înapoi la lista de medici</Button>
                    <Button type="submit">Confirmă Programarea</Button>
                  </Group>
                </Stack>
              </form>
            </Paper>
          </motion.div>
        ) : (
          <>
            <Title order={2} ta="center" mb="xl">Alege un specialist</Title>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
              {/* Adăugăm o verificare suplimentară aici pentru siguranță */}
              {Array.isArray(doctors) && doctors.map((doctor) => (
                <motion.div key={doctor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <Paper withBorder radius="md" p="lg" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Group>
                      <Avatar src={doctor.photo_url} size={80} radius="50%" />
                      <div>
                        <Text fw={700}>{doctor.name}</Text>
                        <Text size="sm" c="sage-green.7">{doctor.specialty}</Text>
                      </div>
                    </Group>
                    <Text size="sm" c="dimmed" my="md" style={{ flexGrow: 1 }}>
                      {doctor.description}
                    </Text>
                    <Group justify="space-between" align="center">
                        <Text fw={500}>RON {doctor.price}</Text>
                        <Button onClick={() => setSelectedDoctor(doctor)} size="sm">
                        Programează
                        </Button>
                    </Group>
                  </Paper>
                </motion.div>
              ))}
            </SimpleGrid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default BookAppointmentPage;