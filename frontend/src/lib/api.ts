import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const uploadFiles = async (files: File[]) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAuthHeaders()
    },
  });
  return response.data;
};

export const processFiles = async (endpoint: string, filenames: string[], params: Record<string, any> = {}) => {
  const headers = getAuthHeaders();

  // If endpoint expects list of strings (JSON body)
  if (endpoint === '/process/image-to-pdf' || endpoint === '/process/merge-pdf') {
      const response = await api.post(endpoint, filenames, { headers });
      return response.data;
  }

  // If endpoint expects Form data (single file + params)
  const formData = new FormData();
  formData.append('filename', filenames[0]);
  Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
  });

  const response = await api.post(endpoint, formData, { headers });
  return response.data;
};
