import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const uploadFiles = async (files: File[]) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const processFiles = async (endpoint: string, filenames: string[], params: Record<string, any> = {}) => {
  // If endpoint expects list of strings (JSON body)
  if (endpoint === '/process/image-to-pdf' || endpoint === '/process/merge-pdf') {
      const response = await api.post(endpoint, filenames);
      return response.data;
  }

  // If endpoint expects Form data (single file + params)
  const formData = new FormData();
  formData.append('filename', filenames[0]);
  Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
  });

  const response = await api.post(endpoint, formData);
  return response.data;
};
