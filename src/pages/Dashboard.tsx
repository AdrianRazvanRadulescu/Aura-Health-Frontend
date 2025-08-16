import { Container, Title, Text, Paper, Button } from '@mantine/core';
import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    // Preluăm datele utilizatorului logat din contextul global
    const { user } = useAuth();

    return (
        <Container py={120}>
            <Title order={1} size={50} ta="center" mb="xl">
                Dashboard
            </Title>
            <Paper withBorder shadow="md" p="xl" radius="md" style={{ maxWidth: '600px', margin: 'auto' }}>
                <Text size="xl" ta="center">
                    Bine ai venit, <strong>{user?.name}!</strong>
                </Text>
                <Text c="dimmed" ta="center" mt="sm">
                    Acesta este panoul tău de control. De aici vei putea să îți gestionezi programările și să îți vizualizezi istoricul medical.
                </Text>
                <Button component={Link} to="/services" fullWidth mt="xl" size="lg">
                    Programează o nouă consultație
                </Button>
            </Paper>
        </Container>
    );
};

export default DashboardPage;