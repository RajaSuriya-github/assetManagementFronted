import { Container, Title, Button, Paper, Group, ActionIcon, Loader } from '@mantine/core';
import { ModalFn } from '../components/Modal';
import { useState, useEffect } from 'react';
import { getAssets, deleteAsset } from '../services/AssetService';
import { useAuth } from '../hooks/useAuth';
import { useDisclosure } from '@mantine/hooks';
import { DataTable } from 'mantine-datatable';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export const DashboardPage = () => {
  const { user, role } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(null); // State for selected asset to edit
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [recordsPerPage] = useState(5); // Records per page

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

  const handleEdit = (asset) => {
    setSelectedAsset(asset); // Set selected asset for editing
    open(); // Open modal
  };

  const handleDelete = async (id) => {
    try {
      await deleteAsset(id); // Call delete service
      fetchAssets(); // Reload assets after deletion
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const reload = () => {
    fetchAssets();
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Paginate the assets based on the current page
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedAssets = assets.slice(startIndex, startIndex + recordsPerPage); // Slicing for pagination

  if (loading) return <Loader size="xl" />;

  return (
    <Container size="lg" mt={40}>
      <Title align="left" style={{ fontFamily: 'Greycliff CF, sans-serif', fontWeight: 500 }}>
        Dashboard
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {role === 'Admin' && (
          <Button variant="light" color="blue" mb="lg" onClick={() => { open(); setSelectedAsset(null); }}>
            Add New Asset
          </Button>
        )}

        <DataTable
          columns={[
            // { accessor: 'id', title: 'ID' }, // Added ID column
            { accessor: 'name', title: 'Asset Name' },
            { accessor: 'type', title: 'Type' },
            { accessor: 'details', title: 'Details' },
            {
              accessor: 'actions',
              title: 'Actions',
              render: (asset) => (
                <>
                {(role === 'Admin')?
                <>
                <Group spacing="sm">
                  <ActionIcon color="blue" onClick={() => handleEdit(asset)}>
                    <CiEdit size={16} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => handleDelete(asset.id)}>
                    <MdDelete size={16} />
                  </ActionIcon>
                </Group>
                </>
                :"N/A"}
                </>
              ),
            },
          ]}
          records={paginatedAssets} // Use paginated assets for records
          totalRecords={assets.length} // Total number of records for pagination
          recordsPerPage={recordsPerPage} // Number of records per page
          page={currentPage} // Current page
          onPageChange={setCurrentPage} // Handle page change
          pagination // Enable pagination
          striped // Add striped effect
          highlightOnHover // Add hover effect
          sx={(theme) => ({
            thead: {
              backgroundColor: theme.colors.blue[6], // Background color for the header
              color: theme.white, // Text color for the header
            },
            'tbody tr:hover': {
              backgroundColor: theme.colors.gray[1], // Custom hover color
            },
            'tbody tr:nth-of-type(odd)': {
              backgroundColor: theme.colors.gray[0], // Custom striped color
            },
          })}
        />
      </Paper>

      {/* Modal for Adding/Editing */}
      {opened && <ModalFn opened={opened} close={close} reload={reload} asset={selectedAsset} />}
    </Container>
  );
};
