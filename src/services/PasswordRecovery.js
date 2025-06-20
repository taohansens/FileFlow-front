const API_URL = import.meta.env.VITE_API_URL;

export const sendRecoveryEmail = async (email) => {
  try {
    const response = await fetch(`${API_URL}/password_recovery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Erro ao recuperar senha.");
    }
  } catch (error) {
    console.error("Erro ao recuperar senha.", error);
    throw error;
  }
};

export const resetPassword = async (recoveryToken, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/password_recovery`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recoveryToken, newPassword })
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Erro ao recuperar senha.");
    }
  } catch (error) {
    console.error("Erro ao recuperar senha.", error);
    throw error;
  }
}