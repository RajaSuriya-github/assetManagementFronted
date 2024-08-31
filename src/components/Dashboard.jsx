import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabaseClient';
import { AssetTable } from './AssetTable';

export const Dashboard = () => {
  const { data: assets, isLoading } = useQuery(['assets'], async () => {
    const { data } = await supabase.from('assets').select('*');
    return data;
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Assets</h1>
      <AssetTable assets={assets} />
    </div>
  );
};
