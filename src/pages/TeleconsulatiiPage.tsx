// src/pages/TeleconsultatiiPage.tsx

import { Box, Container, Title, Text, SimpleGrid, ThemeIcon, Button, Paper, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import { VideoCamera, ShieldCheck, Clock, ChatCircleText, FirstAidKit, Users } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';

// Date pentru beneficii
const benefits = [
  { icon: <Clock size={28} />, title: "Economisești Timp", description: "Fără drumuri la clinică și fără timp pierdut în sălile de așteptare. Totul se întâmplă online." },
  { icon: <ShieldCheck size={28} />, title: "Securizat și Confidențial", description: "Folosim tehnologie de criptare avansată pentru a-ți proteja datele și conversațiile medicale." },
  { icon: <FirstAidKit size={28} />, title: "Acces la Specialiști", description: "Discută cu o gamă largă de medici specialiști, indiferent de locația ta geografică." },
  { icon: <Users size={28} />, title: "Confortul Casei Tale", description: "Beneficiezi de un consult medical profesionist direct din confortul și siguranța casei tale." }
];

// Date pentru pași
const steps = [
    { number: "01", title: "Alege Medicul și Programează", description: "Navighează prin lista de specialiști, alege medicul potrivit și selectează o dată și o oră convenabilă." },
    { number: "02", title: "Confirmă și Plătește Online", description: "Primești confirmarea pe email și efectuezi plata în siguranță, direct din contul tău de pacient." },
    { number: "03", title: "Participă la Apelul Video", description: "La ora programată, accesează link-ul de consultație din contul tău pentru a intra în apelul video cu medicul." },
    { number: "04", title: "Primește Recomandări", description: "După consultație, vei primi rețete, trimiteri sau alte documente medicale direct în contul tău digital." }
  ];
  

const TeleconsultatiiPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box style={{ backgroundColor: 'var(--mantine-color-sage-green-0)' }} py={{base: 80, md: 120}}>
        <Container size="lg">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Group>
                    <ThemeIcon variant="light" size={80} radius="xl"><VideoCamera size={40} /></ThemeIcon>
                    <div>
                        <Title order={1} size={60} fw={700}>
                            Teleconsultații Virtuale
                        </Title>
                        <Text size="xl" c="dimmed" mt="sm" style={{ maxWidth: '700px' }}>
                            Conectează-te cu medici de top, rapid și sigur, direct de acasă.
                        </Text>
                    </div>
                </Group>
            </motion.div>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box component="section" py={{base: 80, md: 120}}>
        <Container size="lg">
          <SectionTitle title="Beneficiile tale principale" />
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
                <ChatCircleText size={48} color="var(--mantine-color-sage-green-7)" />
                <Title order={2} size={42} my="md">Gata să discuți cu un medic?</Title>
                <Text c="dimmed" mb="xl">
                    Sănătatea ta este la un click distanță. Programează acum o teleconsultație și primește sfaturile de care ai nevoie.
                </Text>
                <Button component={Link} to="/book-appointment" size="lg">
                    Programează o consultație
                </Button>
            </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default TeleconsultatiiPage;