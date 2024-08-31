import { useAuth } from '../hooks/useAuth';

export const Profile = () => {
  const { role } = useAuth();
console.log("hvdfhbu:::",role)
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {role?.name}</p>
      <p>Email: {role?.email}</p>
    </div>
  );
};
