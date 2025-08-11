import { Title, Text } from '@mantine/core';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  description?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6 }}
  >
    <Title order={2} ta="center" mb="sm" fw={700} size={42}>
      {title}
    </Title>
    {description && (
      <Text size="xl" ta="center" c="dimmed" mb={80} style={{ maxWidth: '600px', margin: 'auto' }}>
        {description}
      </Text>
    )}
  </motion.div>
);

export default SectionTitle;