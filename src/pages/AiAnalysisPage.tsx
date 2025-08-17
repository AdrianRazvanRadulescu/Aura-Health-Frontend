import { Box, Container, Title, Text, SimpleGrid, ThemeIcon, Button, Paper, Group, FileButton } from '@mantine/core';
import { motion } from 'framer-motion';
import { Brain, UploadSimple, ShieldCheck, Clock, Lightbulb, FileText } from '@phosphor-icons/react';
import SectionTitle from '../components/common/SectionTitle';
import { useState } from 'react';

// Date pentru beneficii
const features = [
  { icon: <Clock size={28} />, title: "Rezultate Rapide", description: "Primești o analiză preliminară a documentelor tale medicale în doar câteva minute." },
  { icon: <ShieldCheck size={28} />, title: "Precizie Înaltă", description: "Algoritmul nostru AI este antrenat pe mii de documente medicale pentru a oferi o acuratețe superioară." },
  { icon: <Lightbulb size={28} />, title: "Claritate și Înțelegere", description: "Explicăm termenii medicali complecși într-un limbaj simplu, ușor de înțeles." },
  { icon: <FileText size={28} />, title: "Acoperire Extinsă", description: "Analizăm o gamă largă de documente: analize de sânge, rapoarte imagistice (RMN, CT), externări și multe altele." }
];

// Date pentru pași
const steps = [
    { number: "01", title: "Încarcă Documentul", description: "Apasă pe butonul de încărcare și selectează fișierul PDF, JPG sau PNG de pe dispozitivul tău." },
    { number: "02", title: "Procesare AI", description: "Inteligența noastră artificială scanează, extrage și analizează datele cheie din documentul tău medical." },
    { number: "03", title: "Generează Raportul", description: "În scurt timp, primești un raport structurat, cu explicații clare și recomandări personalizate." },
];

const AiAnalysisPage = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Box>
      {/* Hero Section */}
      <Box style={{ backgroundColor: 'var(--mantine-color-sage-green-0)' }} py={{base: 80, md: 120}}>
        <Container size="lg">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Group>
                    <ThemeIcon variant="light" size={80} radius="xl"><Brain size={40} /></ThemeIcon>
                    <div>
                        <Title order={1} size={60} fw={700}>
                            Analiză Inteligentă a Documentelor
                        </Title>
                        <Text size="xl" c="dimmed" mt="sm" style={{ maxWidth: '700px' }}>
                            Obține o interpretare rapidă și clară a analizelor tale medicale cu ajutorul tehnologiei AI.
                        </Text>
                    </div>
                </Group>
            </motion.div>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box component="section" py={{base: 80, md: 120}}>
        <Container size="lg">
            <SectionTitle title="Cum funcționează?" />
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
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

      {/* Upload & CTA Section */}
      <Box component="section" py={{base: 80, md: 120}} style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
        <Container size="md" ta="center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <Paper withBorder p={{ base: 'xl', sm: 'xl' }} radius="lg" shadow="md">
                    <UploadSimple size={48} color="var(--mantine-color-sage-green-7)" />
                    <Title order={2} size={36} my="md">Încearcă acum</Title>
                    <Text c="dimmed" mb="xl" style={{ maxWidth: '500px', margin: '0 auto' }}>
                        Încarcă documentul tău medical și lasă tehnologia AI să-ți ofere o perspectivă clară și rapidă.
                    </Text>
                    
                    <FileButton onChange={setFile} accept="image/png,image/jpeg,application/pdf">
                      {(props) => <Button {...props} size="lg" mt="xl" rightSection={<UploadSimple size={20} />}>Încarcă document</Button>}
                    </FileButton>

                    {file && (
                        <Text mt="md" size="sm" c="dimmed">
                            Fișier selectat: {file.name}
                        </Text>
                    )}
                </Paper>
            </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box component="section" py={{base: 80, md: 120}}>
        <Container size="lg">
          <SectionTitle title="De ce să alegi analiza AI?" />
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {features.map((item, index) => (
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
    </Box>
  );
};

export default AiAnalysisPage;