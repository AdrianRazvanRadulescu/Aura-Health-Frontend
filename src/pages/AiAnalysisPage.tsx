import { useState } from 'react';
import {
  Container,
  Title,
  Paper,
  Group,
  Text,
  LoadingOverlay,
  Alert,
  Card,
  ThemeIcon,
  Stack,
  rem,
} from '@mantine/core';
import { Dropzone, FileWithPath, PDF_MIME_TYPE, FileRejection } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconFileText, IconAnalyze, IconAlertCircle } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeDocument } from '../features/dashboard/api/dashboardAPI';

export default function AiAnalysisPage() {
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [rejectionError, setRejectionError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (file: File) => analyzeDocument(file),
    onSuccess: (data) => {
      setAnalysisResult(data.analysis);
    },
    onError: () => {
      setAnalysisResult('A apărut o eroare în timpul analizei. Vă rugăm să încercați din nou.');
    },
  });

  const handleDrop = (droppedFiles: FileWithPath[]) => {
    setRejectionError(null);
    setAnalysisResult(null);
    if (droppedFiles.length > 0) {
      mutation.mutate(droppedFiles[0]);
    }
  };

  const handleReject = (fileRejections: FileRejection[]) => {
    const mainError = fileRejections[0].errors[0];
    if (mainError.code === 'file-too-large') {
      setRejectionError('Fișierul este prea mare. Limita este 2MB.');
    } else if (mainError.code === 'file-invalid-type') {
      setRejectionError('Tip de fișier invalid. Sunt acceptate doar documente PDF.');
    } else {
      setRejectionError('Fișierul nu a putut fi încărcat.');
    }
  };

  return (
    <Container size="md" my="xl">
      <Stack align="center">
        <ThemeIcon size="xl" radius="md" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
          <IconAnalyze />
        </ThemeIcon>
        <Title order={2} ta="center">
          Analiză Inteligentă a Documentelor
        </Title>
        <Text c="dimmed" ta="center" maw={500}>
          Încărcați un document medical în format PDF pentru a primi un sumar automat, generat de AI.
        </Text>
      </Stack>

      <Paper withBorder p="xl" radius="md" mt="xl" style={{ position: 'relative' }}>
        <LoadingOverlay visible={mutation.isPending} zIndex={1} overlayProps={{ radius: 'sm', blur: 2 }} />
        <Dropzone
          onDrop={handleDrop}
          onReject={handleReject}
          maxSize={2 * 1024 ** 2}
          accept={PDF_MIME_TYPE}
          loading={mutation.isPending}
          style={(theme) => ({
            border: `${rem(1)} dashed ${theme.colors.gray[5]}`,
            transition: 'background-color 150ms ease',
            '&:hover': {
              backgroundColor: `light-dark(${theme.colors.gray[0]}, ${theme.colors.dark[6]})`,
            },
          })}
        >
          <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <IconCloudUpload size="3.2rem" stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size="3.2rem" stroke={1.5} color="red" />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFileText size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>

            <Stack align="center">
              <Text size="xl" inline>
                Trageți documentul PDF aici
              </Text>
              <Text size="sm" c="dimmed" inline mt={-10}>
                sau faceți clic pentru a selecta (max. 2MB)
              </Text>
            </Stack>
          </Group>
        </Dropzone>
      </Paper>

      <AnimatePresence>
        {rejectionError && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Alert
              color="red"
              title="Eroare la încărcare"
              icon={<IconAlertCircle />}
              mt="md"
              withCloseButton
              onClose={() => setRejectionError(null)}
            >
              {rejectionError}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {analysisResult && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <Card withBorder shadow="sm" radius="md" mt="xl">
              <Group>
                <ThemeIcon size="lg" radius="md" variant="light">
                  <IconAnalyze />
                </ThemeIcon>
                <Title order={4}>Rezultatul Analizei</Title>
              </Group>
              <Text mt="md" style={{ whiteSpace: 'pre-wrap' }}>
                {analysisResult}
              </Text>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}