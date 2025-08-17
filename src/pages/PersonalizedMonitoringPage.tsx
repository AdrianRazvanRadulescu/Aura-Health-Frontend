// src/pages/PersonalizedMonitoringPage.tsx

import { Box, Container, Title, Text, SimpleGrid, ThemeIcon, Button, Paper, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import { PersonSimpleRun, ChartLineUp, Bell, Heartbeat, Target, UserFocus } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';

// Date pentru beneficii
const benefits = [
  { icon: <Target size={28} />, title: "Abordare Proactivă", description: "Identificăm riscurile potențiale înainte ca ele să devină probleme serioase, ajutându-te să rămâi sănătos." },
  { icon: <UserFocus size={28} />, title: "Plan 100% Personalizat", description: "Planul tău este creat special pentru tine, luând în calcul istoricul medical, stilul de viață și obiectivele tale." },
  { icon: <ChartLineUp size={28} />, title: "Monitorizare Continuă", description: "Urmărim progresul tău și ajustăm planul în timp real pentru a asigura cele mai bune rezultate posibile." },
  { icon: <Bell size={28} />, title: "Recomandări Inteligente", description: "Primești notificări și sfaturi utile despre nutriție, mișcare și controale periodice direct în aplicație." }
];

// Date pentru pași
const steps = [
    { number: "01", title: "Evaluare Inițială Completă", description: "Completezi un chestionar detaliat despre sănătatea și stilul tău de viață pentru a ne oferi o imagine de ansamblu." },
    { number: "02", title: "Crearea Planului Unic", description: "Medicii și algoritmii noștri AI colaborează pentru a dezvolta un plan de prevenție adaptat nevoilor tale." },
    { number: "03", title: "Implementare și Suport", description: "Începi să urmezi recomandările, având acces constant la resurse și la echipa noastră de specialiști." },
    { number: "04", title: "Ajustare și Optimizare", description: "Analizăm periodic datele și progresul tău pentru a optimiza continuu planul de monitorizare." }
  ];
  

const PersonalizedMonitoringPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box style={{ backgroundColor: 'var(--mantine-color-sage-green-0)' }} py={{base: 80, md: 120}}>
        <Container size="lg">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Group>
                    <ThemeIcon variant="light" size={80} radius="xl"><PersonSimpleRun size={40} /></ThemeIcon>
                    <div>
                        <Title order={1} size={60} fw={700}>
                            Monitorizare Personalizată
                        </Title>
                        <Text size="xl" c="dimmed" mt="sm" style={{ maxWidth: '700px' }}>
                            Un plan de sănătate proactiv, creat special pentru a te menține în cea mai bună formă.
                        </Text>
                    </div>
                </Group>
            </motion.div>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box component="section" py={{base: 80, md: 120}}>
        <Container size="lg">
          <SectionTitle title="Beneficiile unui plan personalizat" />
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {benefits.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Group gap="xl" wrap="nowrap">
                  <ThemeIcon variant="light" size={60} radius="md">{item.icon}</ThemeIcon>
                  <div>
                    <Text fw={700} size="lg" mb={4}>{item.title}</Text>
                    <Text c="dimmed">{item.description}</Text>
                  </div>
                </Group>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      
      {/* How It Works Section */}
      <Box component="section" py={{base: 80, md: 120}} style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
        <Container size="lg">
            <SectionTitle title="Cum funcționează?" />
            <SimpleGrid cols={{ base: 1, md: 4 }} spacing="xl">
                {steps.map((step, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.15 }}>
                        <Paper withBorder p="xl" radius="md" style={{height: '100%'}}>
                            <Text c="sage-green" fw={700} size="xl" mb="md">{step.number}</Text>
                            <Text fw={600} mb="xs">{step.title}</Text>
                            <Text c="dimmed" size="sm">{step.description}</Text>
                        </Paper>
                    </motion.div>
                ))}
            </SimpleGrid>
        </Container>
      </Box>

      <Box component="section" py={{base: 80, md: 120}}>
        <Container size="sm" ta="center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Heartbeat size={48} color="var(--mantine-color-sage-green-7)" />
                <Title order={2} size={42} my="md">Preia controlul sănătății tale</Title>
                <Text c="dimmed" mb="xl">
                    Nu aștepta să apară problemele. Începe astăzi să construiești un viitor mai sănătos cu un plan creat doar pentru tine.
                </Text>
                <Button component={Link} to="/register" size="lg">
                    Creează-ți planul acum
                </Button>
            </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default PersonalizedMonitoringPage;