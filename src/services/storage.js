const API_URL = import.meta.env.VITE_API_URL;

export const getAllItems = async (token) => {
  try {
    const response = await fetch(`${API_URL}/file`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return {
        files: data.map((file) => ({
          id: file.id,
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          createdAt: new Date(file.createdAt).toLocaleDateString(),
          mimeType: file.mimeType,
        })),
        folders: [],
      };
    } else {
      throw new Error("Erro ao buscar arquivos.");
    }
  } catch (error) {
    console.error("Erro ao carregar itens:", error);
    throw error;
  }
};

export const uploadFile = async (file, folderId, token) => {
  try {
    const base64 = await convertFileToBase64(file);
    const response = await fetch(`${API_URL}/file`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: file.name,
        mimeType: file.type,
        base64: base64.split(",")[1],
        folderId: folderId || null,
      }),
    });

    if (response.status === 201) {
      const data = await response.json();
      return data.message;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao enviar arquivo.");
    }
  } catch (error) {
    console.error("Erro ao enviar arquivo:", error);
    throw error;
  }
};

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const createFile = (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newFile = {
        id: "file-" + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: "file",
        size: file.size || "0 KB",
        createdAt: new Date().toISOString().split("T")[0],
      };

      mockData.files.push(newFile);
      resolve(newFile);
    }, 300);
  });
};

export const deleteFile = async (folderId, fileName, token) => {
  try {
    const response = await fetch(
      `${API_URL}/file/${folderId || 0}/${fileName}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      return data.message;
    } else if (response.status === 400) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao deletar arquivo.");
    } else {
      throw new Error("Erro desconhecido ao deletar arquivo.");
    }
  } catch (error) {
    console.error("Erro ao deletar arquivo:", error);
    throw error;
  }
};
export const downloadFile = async (folderId, fileName, token) => {
  try {
    const response = await fetch(
      `${API_URL}/file/download/${folderId || 0}/${fileName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao baixar arquivo.");
    }
  } catch (error) {
    console.error("Erro ao baixar arquivo:", error);
    throw error;
  }
};

export const createFolder = async (folderName, token) => {
  try {
    const response = await fetch(`${API_URL}/folder`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: folderName }),
    });

    if (response.status === 201) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar pasta.");
    }
  } catch (error) {
    console.error("Erro ao criar pasta:", error);
    throw error;
  }
};

export const listFolders = async (token) => {
  try {
    const response = await fetch(`${API_URL}/folder/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Erro ao listar pastas.");
    }
  } catch (error) {
    console.error("Erro ao listar pastas:", error);
    throw error;
  }
};

export const deleteFolder = async (folderId, token) => {
  try {
    const response = await fetch(`${API_URL}/folder/${folderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data.message;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao deletar pasta.");
    }
  } catch (error) {
    console.error("Erro ao deletar pasta:", error);
    throw error;
  }
};

export const getFilesByFolder = async (folderId, token) => {
  try {
    const response = await fetch(
      `${API_URL}/folder/${folderId}/files`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Erro ao buscar arquivos da pasta.");
    }
  } catch (error) {
    console.error("Erro ao buscar arquivos da pasta:", error);
    throw error;
  }
};