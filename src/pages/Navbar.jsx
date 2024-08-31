// import { Button, Container, Group, Text } from '@mantine/core';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
const NavbarFN = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Optionally, you can add more actions here like redirecting the user to the login page
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={()=>navigate("/dashboard")}><h2>Asset Management</h2></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        {user && (
          <Button onClick={handleLogout} type="button" className='me-2'>Logout</Button>
        )}
         {user && (
          <Button onClick={()=>navigate('/profile')} type="button" >Profile</Button>
        )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarFN;
