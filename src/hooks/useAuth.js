import { supabase } from '../services/supabaseClient';
import { getProfile } from '../services/ProfileService';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isShow, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current session
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchSession();
    const getProfileFn=async (userid)=>{
      const data = await getProfile(userid);
      sessionStorage.setItem("userId",JSON.stringify(userid));
      sessionStorage.setItem("data",JSON.stringify(data));
      setRole(data.role);
    }
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      getProfileFn(session?.user?.id);
      setShow(true);
    });
    
    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error(error);
    } else {
      navigate('/dashboard');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  return { user,role, login, logout };
};
