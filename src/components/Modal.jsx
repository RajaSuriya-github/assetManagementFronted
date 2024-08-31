import { useState, useEffect } from 'react';
import { Modal, Button, TextInput } from '@mantine/core';
import { createAsset, updateAsset } from '../services/AssetService';

export const ModalFn = ({ opened, close, reload, asset }) => {
  const [formData, setFormData] = useState({ name: '', type: '', details: '' });

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name || '',
        type: asset.type || '',
        details: asset.details || '',
      });
    } else {
      setFormData({ name: '', type: '', details: '' });
    }
  }, [asset]);

  const handleSubmit = async () => {
    try {
      if (asset) {
        // Edit existing asset
        await updateAsset(asset.id, formData);
      } else {
        // Create new asset
        await createAsset(formData);
      }
      reload(); // Reload asset data
      close(); // Close modal
    } catch (error) {
      console.error('Error submitting asset:', error);
    }
  };

  return (
    <Modal opened={opened} onClose={close} title={asset ? 'Edit Asset' : 'Add New Asset'}>
      <TextInput
        label="Asset Name"
        value={formData.name}
        onChange={(event) => setFormData({ ...formData, name: event.currentTarget.value })}
      />
      <TextInput
        label="Type"
        value={formData.type}
        onChange={(event) => setFormData({ ...formData, type: event.currentTarget.value })}
      />
      <TextInput
        label="Details"
        value={formData.details}
        onChange={(event) => setFormData({ ...formData, details: event.currentTarget.value })}
      />
      <Button onClick={handleSubmit} fullWidth mt="md">
        {asset ? 'Update Asset' : 'Create Asset'}
      </Button>
    </Modal>
  );
};
