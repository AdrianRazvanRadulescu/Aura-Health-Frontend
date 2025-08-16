import React from 'react';
import { Paper, Title, Text, Box, Badge, MantineTheme } from '@mantine/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  link?: string;
  delay?: number;
}

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  inView: { opacity: 1, y: 0 }
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  badge,
  link = "#",
  delay = 0
}) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="inView"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay }}
      style={{ height: '100%' }}
    >
      <Paper
        component={Link}
        to={link}
        p="xl"
        shadow="sm"
        withBorder
        radius="md"
        styles={(theme: MantineTheme) => ({
          root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            textDecoration: 'none',
            color: 'inherit',
            border: `1px solid ${theme.colors['sage-green'][2]}`,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            position: 'relative',

            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: theme.shadows.md,
              borderColor: theme.colors['sage-green'][4],
            },
            '&:hover .hoverArrow': {
              opacity: 1,
              transform: 'translateX(0)',
            },
          },
        })}
      >
        <Box mb="md" c="var(--mantine-color-sage-green-7)">
          {icon}
        </Box>
        <Title order={4} fw={700} mb="xs">
          {title}
        </Title>
        <Text c="dimmed" size="sm" style={{ flexGrow: 1 }}>
          {description}
        </Text>
        {badge && (
          <Badge color="sage-green" variant="light" mt="sm" style={{ alignSelf: 'flex-start' }}>
            {badge}
          </Badge>
        )}
        <ArrowRight
          className="hoverArrow"
          size={24}
          color="var(--mantine-color-sage-green-7)"
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            opacity: 0,
            transform: 'translateX(-10px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        />
      </Paper>
    </motion.div>
  );
};

export default ServiceCard;