import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getFilesByFolder } from '../../services/storage';
import FileItem from './FileItem';

const FileList = ({ folderId }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const data = await getFilesByFolder(folderId, token);
      setFiles(data); 
    } catch (error) {
      console.error('Erro ao carregar arquivos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFiles();
    }
  }, [token, folderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {files.length === 0 ? (
        <div className="text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1a1 1 0 01-1 1H3a1 1 0 01-1-1V6zm2-2a1 1 0 00-1 1v7a1 1 0 001 1h12a1 1 0 001-1V9a1 1 0 00-1-1H9.414l-1.707-1.707A1 1 0 007 6H4V4z" clipRule="evenodd" />
          </svg>
          <p className="text-gray-500">Nenhum arquivo encontrado nesta pasta</p>
        </div>
      ) : (
        <div>
          <h2 className="text-gray-600 text-sm font-medium mb-2">Arquivos</h2>
          <div className="space-y-2">
            {files.map((file) => (
              <FileItem key={file.id} file={file} onUpdate={fetchFiles} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileList;