import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../UI/Input';
import Button from '../UI/Button';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('As senhas não coincidem');
    }
    
    try {
      setLoading(true);
      await register(formData.email, formData.password);
      alert('Registro realizado com sucesso!');
      navigate('/');
    } catch (err) {
      setError('Falha no registro. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <Input
        type="email"
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="seuemail@exemplo.com"
        required
      />
      
      <Input
        type="password"
        label="Senha"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="********"
        required
      />
      
      <Input
        type="password"
        label="Confirmar Senha"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="********"
        required
      />
      
      <div className="flex items-center justify-between">
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </Button>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-primary font-medium hover:text-secondary">
            Faça login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;