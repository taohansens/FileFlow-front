import { useState } from 'react';
import { uploadFile } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';

const UploadFileButton = ({ folderId, onFileUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { token } = useAuth();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadFile(file, folderId, token);
      alert('Arquivo enviado com sucesso!');
      onFileUploaded();
    } catch (error) {
      alert(error.message || 'Erro ao enviar arquivo.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="btn btn-primary cursor-pointer">
        {isUploading ? 'Enviando...' : 'Enviar Arquivo'}
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
    </div>
  );
};

export default UploadFileButton;