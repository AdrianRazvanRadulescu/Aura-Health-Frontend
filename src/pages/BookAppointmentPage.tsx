import { Container, Title, Text, SimpleGrid, Loader, Center, Modal, Button } from '@mantine/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDoctorsAPI, createAppointmentAPI } from '../features/dashboard/api/dashboardAPI';
import DoctorCard from '../components/dashboard/DoctorCard';
import { useState } from 'react';
import { Doctor } from '../features/dashboard/types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mantine/dates';

const BookAppointmentPage = () => {
  const [opened, setOpened] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: doctors, isLoading } = useQuery<Doctor[]>({
    queryKey: ['doctors'],
    queryFn: getDoctorsAPI,
  });

  const mutation = useMutation({
    mutationFn: createAppointmentAPI,
    onSuccess: () => {
      toast.success('Programare creată cu succes!');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      setOpened(false);
      navigate('/dashboard');
    },
    onError: () => {
      toast.error('A apărut o eroare. Vă rugăm încercați din nou.');
    },
  });

  const handleBookClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setOpened(true);
  };
  
  const handleConfirmBooking = () => {
    if (selectedDoctor && appointmentDate) {
      mutation.mutate({
        doctor_id: selectedDoctor.id,
        appointment_date: appointmentDate.toISOString(),
      });
    }
  };

  if (isLoading) {
    return <Center h={400}><Loader /></Center>;
  }

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title={`Programează o consultație cu ${selectedDoctor?.name}`}>
        <DateTimePicker
          label="Alege data și ora"
          placeholder="Selectează data și ora"
          value={appointmentDate}
          onChange={(value) => setAppointmentDate(value ? new Date(value) : null)}
          minDate={new Date()}
        />
        <Button fullWidth mt="xl" onClick={handleConfirmBooking} loading={mutation.isPending}>
          Confirmă Programarea
        </Button>
      </Modal>

      <Container size="xl" py={60}>
        <Title order={1} size={48} fw={700}>
          Găsește un Specialist
        </Title>
        <Text size="lg" c="dimmed" mt="sm" mb={40}>
          Alege medicul potrivit pentru nevoile tale și programează o consultație online.
        </Text>
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          {doctors?.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onBook={() => handleBookClick(doctor)} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default BookAppointmentPage;
