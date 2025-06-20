import Input from "../components/UI/Input.jsx";
import { useState } from "react";
import Button from "../components/UI/Button.jsx";
import { sendRecoveryEmail } from "../services/PasswordRecovery.js";

const RequestPasswordRecovery = () => {
  const [formData, setFormData] = useState({ username: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.username)) {
      setError('Email invalido.');
      return;
    }

    try {
      await sendRecoveryEmail(formData.username);
      setSuccessMessage('E-mail de recuperação enviado com sucesso!');
    } catch (error) {
      setError('Erro ao enviar o e-mail de recuperação. Tente novamente.');
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-gray-50">
      <div>
        <h1 className="text-center text-3xl font-bold text-primary">FileFlow</h1>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Recuperação de Senha
        </h2>
      </div>
      <div className="bg-white py-8 px-8 shadow rounded-lg mt-5 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email de recuperação"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Email para recuperação"
            required
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm mt-2">{successMessage}</p>}
          <Button type="submit" className="w-full mt-4">
            Enviar Email de Recuperação
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RequestPasswordRecovery;
