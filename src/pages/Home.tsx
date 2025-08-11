import React from 'react';
import { Container, Grid, Button, Title, Text, Box, Paper, ThemeIcon, Stack, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import { CaretRight, User, VideoCamera, NotePencil, Star } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';
import ServiceCard from '../components/common/ServiceCard';

// NOU: Tipuri pentru datele noastre
interface HomeService {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

interface HowItWorksStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const homeServices: HomeService[] = [
  { icon: <VideoCamera size={32} />, title: "Virtual Consultations", description: "Connect with doctors securely via video call.", link: '/services' },
  { icon: <NotePencil size={32} />, title: "AI-Powered Diagnostics", description: "Utilize advanced AI tools for preliminary symptom analysis.", link: '/services' },
  { icon: <User size={32} />, title: "Personalized Health Monitoring", description: "Track your health data, receive personalized insights.", link: '/services' },
];

const howItWorksSteps: HowItWorksStep[] = [
    { icon: <User size={32} />, title: '1. Creați Cont', description: 'Înregistrați-vă rapid și completați profilul medical.' },
    { icon: <VideoCamera size={32} />, title: '2. Programați Consultația', description: 'Alegeți medicul și ora potrivită pentru o întâlnire video.' },
    { icon: <NotePencil size={32} />, title: '3. Primiți Planul', description: 'Obțineți diagnostic și un plan de tratament personalizat.' },
];

const testimonials: Testimonial[] = [
    { name: 'Elena Popescu', role: 'Pacientă', text: 'Serviciul a fost incredibil de rapid și profesionist. Am rezolvat problema medicală fără să plec de acasă. Recomand!', rating: 5 },
    { name: 'Mihai Ionescu', role: 'Pacient', text: 'Aplicația este foarte intuitivă, iar medicul a fost extrem de amabil și competent. O experiență de 5 stele.', rating: 5 },
    { name: 'Ana Dinu', role: 'Pacientă', text: 'Monitorizarea AI m-a ajutat să înțeleg mai bine starea mea de sănătate și să fac schimbări pozitive în stilul de viață.', rating: 5 },
]

const Home: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box style={{ background: 'linear-gradient(180deg, var(--mantine-color-white), var(--mantine-color-sage-green-0))' }}>
        <Container size="xl" py={{ base: 80, md: 120 }}>
          <Grid align="center" gutter={60}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Title order={1} size={68} fw={700} mb="md" style={{ lineHeight: '1.2' }}>
                  The Natural <br /> Evolution of Care.
                </Title>
                <Text size="xl" c="dimmed" mb="xl" style={{ maxWidth: '500px' }}>
                  We blend advanced technology with a human-centric approach, creating a healthcare experience that's both intelligent and intuitive.
                </Text>
                <Button component={Link} to="/services" size="lg" rightSection={<CaretRight />} variant="filled">
                  Book an Appointment
                </Button>
              </motion.div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
                <Box style={{ 
                    width: '100%', height: '500px', borderRadius: '24px', backgroundSize: 'cover', backgroundPosition: 'center',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1576091160550-2173dba999ab?q=80&w=2070&auto=format&fit=crop)' 
                }} />
              </motion.div>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

       <Box py={120}>
        <Container size="lg">
          <SectionTitle title="Cum Funcționează?" description="Trei pași simpli pentru a accesa serviciile medicale de care ai nevoie." />
          <Grid gutter="xl">
            {howItWorksSteps.map((step, index) => (
              <Grid.Col span={{ base: 12, md: 4 }} key={index}>
                 <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.15 }}>
                    <Stack align="center" ta="center">
                        {/* CORECTAT: Am înlocuit <step.icon /> cu {step.icon} */}
                        <ThemeIcon variant="light" size={64} radius="xl">{step.icon}</ThemeIcon>
                        <Title order={4} fw={600}>{step.title}</Title>
                        <Text c="dimmed">{step.description}</Text>
                    </Stack>
                 </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Secțiunea Servicii Digitale */}
      <Box py={120} style={{ backgroundColor: 'var(--mantine-color-sage-green-0)' }}>
        <Container size="lg">
          <SectionTitle title="Our Digital Services" description="Accessible, personalized, and built around your needs." />
          <Grid gutter="xl">
            {homeServices.map((service, index) => (
              <Grid.Col span={{ base: 12, md: 4 }} key={index}>
                <ServiceCard 
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    link={service.link}
                    delay={index * 0.1}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box py={120}>
        <Container size="lg">
          <SectionTitle title="Ce Spun Pacienții Noștri" />
           <Grid gutter="xl">
            {testimonials.map((testimonial, index) => (
               <Grid.Col span={{ base: 12, md: 4 }} key={index}>
                 <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.15 }}>
                    <Paper p="xl" shadow="sm" radius="md" withBorder style={{height: '100%'}}>
                        <Group mb="md">
                            {[...Array(testimonial.rating)].map((_, i) => <Star key={i} weight="fill" color="var(--mantine-color-yellow-5)" />)}
                        </Group>
                        <Text style={{ fontStyle: 'italic' }} mb="md">"{testimonial.text}"</Text>
                        <Title order={5} fw={600}>{testimonial.name}</Title>
                        <Text size="sm" c="dimmed">{testimonial.role}</Text>
                    </Paper>
                 </motion.div>
               </Grid.Col>
            ))}
           </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;