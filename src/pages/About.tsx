import { Container, Title, Text, Box } from '@mantine/core';
import { motion } from 'framer-motion';
const About = () => {
  return (
    <Box py={120}>
      <Container size="lg" ta="center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Title order={1} size={60} fw={700} mb="md">
            Despre noi
          </Title>
          <Text size="xl" c="dimmed" style={{ maxWidth: '700px', margin: 'auto' }}>
            Suntem o echipă de profesioniști pasionați de sănătate și tehnologie. Misiunea noastră este de a oferi o experiență de îngrijire medicală modernă, accesibilă și personalizată, prin intermediul inovației digitale. Credem că fiecare persoană merită acces la cele mai bune servicii medicale, indiferent de locație.
          </Text>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;