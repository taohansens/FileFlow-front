import { useState } from "react";
import Input from "../components/UI/Input.jsx";
import Button from "../components/UI/Button.jsx";
import {resetPassword} from "../services/PasswordRecovery.js";
import {useNavigate, useSearchParams} from "react-router-dom";

const PasswordRecovery = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const token = searchParams.get("token");
      await resetPassword(token, formData.password);

      setTimeout(() => navigate("/login"), 2000);
      setSuccessMessage("Senha redefinida com sucesso!");
    } catch (error) {
      console.error(error);
      setError("Erro ao redefinir a senha. Tente novamente.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-gray-50">
      <div>
        <h1 className="text-center text-3xl font-bold text-primary">FileFlow</h1>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Redefinir Senha
        </h2>
      </div>
      <div className="bg-white py-8 px-8 shadow rounded-lg mt-5 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            label="Nova senha"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Digite sua nova senha"
            required
          />

          <Input
            type="password"
            label="Confirmar nova senha"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirme sua nova senha"
            required
          />

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          {successMessage && (
            <p className="text-green-600 text-sm mt-2">{successMessage}</p>
          )}

          <Button type="submit" className="w-full mt-4">
            Redefinir Senha
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecovery;
