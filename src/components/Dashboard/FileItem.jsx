import { useState } from 'react';
import { deleteFile, downloadFile } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';

const FileItem = ({ file, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { token } = useAuth();

  const handleDelete = async () => {
    if (confirm(`Tem certeza que deseja excluir ${file.name}?`)) {
      setIsDeleting(true);
      try {
        await deleteFile(file.folderId || 0, file.name, token);
        onUpdate();
      } catch (error) {
        alert(error.message || 'Erro ao deletar arquivo.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadFile(file.folderId || 0, file.name, token);
    } catch (error) {
      alert(error.message || 'Erro ao baixar arquivo.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{file.name}</h3>
          <div className="text-xs text-gray-500 mt-1">
            {file.size} • {file.createdAt}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          className="p-1 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
          onClick={handleDownload}
          disabled={isDownloading}
          title="Baixar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          className="p-1 text-gray-500 hover:text-red-600 rounded-md hover:bg-gray-100"
          onClick={handleDelete}
          disabled={isDeleting}
          title="Excluir"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FileItem;