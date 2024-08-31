import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../services/supabaseClient';
import { TextInput, Paper, Button, Container, Title } from '@mantine/core';
import { useDataTableColumns } from 'mantine-datatable';
import { updateProfile } from '../services/ProfileService';

export const ProfilePage = () => {
  const { role } = useAuth();
  const {firstName:ufn,lastName:uln,designation:ud,id,userId}=JSON.parse(sessionStorage.getItem("data"));
  const [firstName, setFirstName] = useState(ufn|| '');
  const [lastName, setLastName] = useState(uln || '');
  const [designation, setDesignation] = useState(ud|| '');
  const [loading, setLoading] = useState(false);

  
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
     let value={
      "id": id,
      "firstName":firstName,
      "lastName": lastName,
      "designation":ud,
      "role":role
  }
  const res=await updateProfile(userId,value);
  if(res){
    sessionStorage.setItem("data",JSON.stringify(res));
  }
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Profile Settings</Title>
      <Paper withBorder shadow="md" p={30} mt={30}>
        <TextInput
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={role!=="Admin"}
        />
        <TextInput
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          mt="md"
          disabled={role!=="Admin"}
        />
        <TextInput
          label="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          mt="md"
          disabled
        />
        {role==="Admin"&&<Button fullWidth mt="xl" onClick={handleUpdateProfile} loading={loading}>
          Update Profile
        </Button>}
      </Paper>
    </Container>
  );
};
