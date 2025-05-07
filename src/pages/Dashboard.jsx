import { useState, useEffect } from 'react';
import Navbar from '../components/Dashboard/Navbar';
import FileList from '../components/Dashboard/FileList';
import UploadFileButton from '../components/Dashboard/UploadFileButton';
import FolderList from '../components/Dashboard/FolderList.jsx';
import { listFolders } from '../services/storage';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState({ id: 0, name: 'Raiz' });
  const { token } = useAuth();

  const handleItemCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const fetchFolders = async () => {
    try {
      const data = await listFolders(token);
      setFolders([{ id: 0, name: 'Raiz' }, ...data]);
    } catch (error) {
      console.error('Erro ao carregar pastas:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFolders();
    }
  }, [token]);

  const handleFolderChange = (folder) => {
    setCurrentFolder(folder);
    handleItemCreated();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Meus Arquivos</h1>
          <UploadFileButton folderId={currentFolder.id} onFileUploaded={handleItemCreated} />
        </div>

        <div className="mb-4">
          <FolderList 
            folders={folders} 
            currentFolder={currentFolder} 
            onFolderChange={handleFolderChange} 
            onRefresh={fetchFolders} 
          />
        </div>
        
        <FileList key={refreshTrigger} folderId={currentFolder.id} />
      </main>
    </div>
  );
};

export default Dashboard;