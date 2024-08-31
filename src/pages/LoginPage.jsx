import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { TextInput, PasswordInput, Paper, Group, Button, Title, Container } from '@mantine/core';

export const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome Back!</Title>
      <Paper withBorder shadow="md" p={30} mt={30}>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mt="md"
          />
          <Group position="apart" mt="md">
            <Button fullWidth type="submit" mt="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};
