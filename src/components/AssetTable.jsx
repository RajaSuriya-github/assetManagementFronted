// import { Box } from '@mantine/core';
// // import { showNotification } from '@mantine/notifications';
// import { DataTable } from 'mantine-datatable';

// export const AssetTable = () => {
//   const data = [
//     { id: 1, name: 'Laptop', type: 'Electronics', details: 'Dell XPS 13' },
//     { id: 2, name: 'Chair', type: 'Furniture', details: 'Ergonomic Chair' },
//   ];

//   return (
//     <DataTable
//     withTableBorder
//     borderRadius="sm"
//     withColumnBorders
//     striped
//     highlightOnHover
//     // 👇 provide data
//     records={data}
//     // 👇 define columns
//     columns={[
//       {
//         accessor: 'id',
//         // 👇 this column has a custom title
//         title: 'ID',
//         // 👇 right-align column
//         textAlign: 'center',
//       },
//       { accessor: 'name' ,textAlign: 'center'},
//       { accessor: 'details' ,textAlign: 'center'},
//     ]}
//     // 👇 execute this callback when a row is clicked
//     // onRowClick={({ record: { name, party, bornIn } }) =>
//     //   // showNotification({
//     //   //   title: `Clicked on ${name}`,
//     //   //   message: `You clicked on ${name}, a ${party.toLowerCase()} president born in ${bornIn}`,
//     //   //   withBorder: true,
//     //   // })
//     // }
//   />
//   );
// };
import { useState, useEffect } from 'react';
import { getAssets } from '../services/AssetService';
import { DataTable } from 'mantine-datatable';
import { Loader } from '@mantine/core';

export const AssetTable = ({reload}) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAssets = async () => {
    try {
      const data = await getAssets();
      setAssets(data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAssets();
  }, []);
 const reload=()=>{
  fetchAssets();
 }
  if (loading) return <Loader size="xl" />;

  return (
    <DataTable
      columns={[
        { accessor: 'name', title: 'Asset Name' },
        { accessor: 'type', title: 'Type' },
        { accessor: 'details', title: 'Details' },
      ]}
      records={assets}
      pagination
      recordsPerPage={5}
    />
  );
};
