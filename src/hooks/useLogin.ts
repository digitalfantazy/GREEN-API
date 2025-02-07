import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { useAuth } from '../context/AuthContext';

export const useLogin = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({ idInstance: false, apiTokenInstance: false });

  const navigate = useNavigate();
  const { setAuthData, setUserData } = useAuth();

  const resetErrors = () => {
    setError('');
    setErrors({ idInstance: false, apiTokenInstance: false });
  };

  const validateInputs = () => {
    const newErrors = {
      idInstance: !idInstance.trim(),
      apiTokenInstance: !apiTokenInstance.trim(),
    };

    setErrors(newErrors);

    if (newErrors.idInstance || newErrors.apiTokenInstance) {
      setError('Поля не могут быть пустыми!');
      return false;
    }

    return true;
  };

  const fetchUserData = async () => {
    try {
      const { data: userData } = await axios.get(`${API_URL}waInstance${idInstance}/getWaSettings/${apiTokenInstance}`);

      setAuthData(idInstance, apiTokenInstance);
      setUserData(userData);
      localStorage.setItem('userData', JSON.stringify(userData));

      navigate('/chat');
    } catch (error) {
      console.error('Ошибка при отправке запроса', error);
      setError('Не удалось подключиться. Попробуйте позже.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();

    if (!validateInputs()) return;

    await fetchUserData();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'idInstance') {
      setIdInstance(value);
      if (errors.idInstance) setErrors((prev) => ({ ...prev, idInstance: false }));
    }

    if (name === 'apiTokenInstance') {
      setApiTokenInstance(value);
      if (errors.apiTokenInstance) setErrors((prev) => ({ ...prev, apiTokenInstance: false }));
    }

    setError('');
  };

  return {
    idInstance,
    apiTokenInstance,
    error,
    errors,
    handleLogin,
    handleInputChange,
  };
};
