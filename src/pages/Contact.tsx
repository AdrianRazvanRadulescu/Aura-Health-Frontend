import { Container, Title, Text, Box, Group, Anchor } from '@mantine/core';
import { motion } from 'framer-motion';
import { EnvelopeSimple, Phone, MapPin } from '@phosphor-icons/react';

const Contact = () => {
  return (
    <Box py={120}>
      <Container size="lg" ta="center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Title order={1} size={60} fw={700} mb="md">
            Contact
          </Title>
          <Text size="xl" c="dimmed" style={{ maxWidth: '700px', margin: 'auto' }}>
            Suntem aici pentru a te ajuta! Ne poți contacta folosind detaliile de mai jos sau completând formularul de contact.
          </Text>
          <Group justify="center" mt="xl" gap="xl">
            <Group gap="xs">
              <EnvelopeSimple size={24} />
              <Anchor href="mailto:contact@aurahealth.ro" c="dimmed">contact@aurahealth.ro</Anchor>
            </Group>
            <Group gap="xs">
              <Phone size={24} />
              <Anchor href="tel:+40123456789" c="dimmed">+40 123 456 789</Anchor>
            </Group>
            <Group gap="xs">
              <MapPin size={24} />
              <Text c="dimmed">București, România</Text>
            </Group>
          </Group>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;