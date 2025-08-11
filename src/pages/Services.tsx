import { Box, Container, Title, Text, SimpleGrid } from '@mantine/core';
import { motion } from 'framer-motion';
import { Heartbeat, Brain, Stethoscope, FileText, FirstAid, Shield } from '@phosphor-icons/react';
import ServiceCard from '../components/common/ServiceCard';

const serviceDetails = [
  { icon: <Heartbeat size={40} />, title: "Teleconsultații Virtuale", description: "Conectează-te cu medici specialisti prin apeluri video sigure, direct de acasă, pentru o diagnoză rapidă și eficientă.", badge: "Popular", link: "/services/teleconsultatii" },
  { icon: <Brain size={40} />, title: "Analiză bazată pe AI", description: "Folosește instrumentele noastre AI pentru o evaluare preliminară a simptomelor, ajutându-te să înțelegi mai bine starea ta de sănătate.", badge: "Nou", link: "/services/ai-analysis" },
  { icon: <Stethoscope size={40} />, title: "Monitorizare Personalizată", description: "Urmărește-ți datele de sănătate în timp real, primește sfaturi personalizate și alerte pentru a menține un stil de viață sănătos.", link: "/services/monitoring" },
  { icon: <FileText size={40} />, title: "Fișe Medicale Digitale", description: "Accesează-ți istoricul medical, analizele și prescripțiile oricând și oriunde, într-un format sigur și ușor de gestionat.", link: "/services/medical-records" },
  { icon: <FirstAid size={40} />, title: "Planuri de Tratament Integrate", description: "Colaborare între specialiști pentru a-ți crea planuri de tratament complexe, adaptate nevoilor tale unice.", link: "/services/treatment-plans" },
  { icon: <Shield size={40} />, title: "Securitate și Confidențialitate", description: "Garantăm securitatea și confidențialitatea datelor tale medicale, folosind cele mai avansate tehnologii de criptare.", link: "/services/security" }
];

const Services = () => {
  return (
    <Box>
      <Box style={{ backgroundColor: 'var(--mantine-color-sage-green-0)' }} py={{base: 80, md: 120}}>
        <Container size="lg" ta="center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Title order={1} size={60} fw={700}>
              Serviciile Noastre Digitale
            </Title>
            <Text size="xl" c="dimmed" mt="lg" style={{ maxWidth: '700px', margin: 'auto' }}>
              De la consultații virtuale la managementul complet al sănătății, oferim o gamă largă de servicii pentru a-ți simplifica viața.
            </Text>
          </motion.div>
        </Container>
      </Box>

      <Container size="lg" py={{base: 80, md: 120}}>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl" verticalSpacing="xl">
          {serviceDetails.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              badge={service.badge}
              link={service.link}
              delay={index * 0.05}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Services;