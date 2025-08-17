import { Container, SimpleGrid, Title, Text, Box } from '@mantine/core';
import ServiceCard from '../components/common/ServiceCard';
import { Stethoscope, ChatTeardropText, Brain, PersonSimpleRun } from '@phosphor-icons/react';

const services = [
  {
    icon: <Stethoscope size={32} />,
    title: 'Consultații Specializate',
    description: 'Accesează o rețea vastă de medici specialiști pentru diagnosticare și tratament.',
    link: '/book-appointment'
  },
  {
    icon: <ChatTeardropText size={32} />,
    title: 'Teleconsultații Virtuale',
    description: 'Discută cu un medic online, rapid și confidențial, direct din confortul casei tale.',
    link: '/services/teleconsultatii'
  },
  {
    icon: <Brain size={32} />,
    title: 'Analiză bazată pe Inteligență Artificială',
    description: 'Încarcă documentele tale medicale și primește o analiză detaliată generată de AI.',
    link: '/services/ai-analysis'
  },
  {
    icon: <PersonSimpleRun size={32} />,
    title: 'Planuri de Prevenție Personalizate',
    description: 'Primește recomandări și planuri personalizate pentru a-ți menține starea de sănătate.',
    link: '/services/personalized-monitoring' // Am actualizat link-ul aici
  },
];

const Services = () => {
  return (
    <Box>
        <Box bg="gray.0" py={{base: 60, md: 100}}>
            <Container>
                <Title ta="center">Serviciile Noastre</Title>
                <Text ta="center" size="lg" c="dimmed" mt="md">Ne dedicăm să îți oferim cea mai bună îngrijire medicală, combinând expertiza cu tehnologia.</Text>
            </Container>
        </Box>

        <Container size="lg" py={{base: 60, md: 100}}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
            ))}
            </SimpleGrid>
        </Container>
    </Box>
  );
};

export default Services;