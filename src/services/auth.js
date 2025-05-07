const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return {
        token: data.token,
        email: email,
      };
    } else if (response.status === 403) {
      const errorData = await response.json();
      throw new Error(errorData.token || 'Usuário inexistente ou senha inválida.');
    } else {
      throw new Error('Erro ao realizar login.');
    }
  } catch (error) {
    throw new Error(error.message || 'Erro desconhecido.');
  }
};
  
  export const register = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
  
      if (response.status === 201) {
        const data = await response.json();
        return {
          id: 'user-' + Math.random().toString(36).substr(2, 9), 
          name: name,
          email: email,
          message: data.message,
        };
      } else if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Usuário já existe.');
      } else {
        throw new Error('Erro ao registrar o usuário.');
      }
    } catch (error) {
      throw new Error(error.message || 'Erro desconhecido.');
    }
  };
  
  export const logout = () => {
    return true;
  };