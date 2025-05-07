import { useState } from 'react';
import { deleteFile } from '../../services/storage';

const FolderItem = ({ folder, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Tem certeza que deseja excluir a pasta ${folder.name}?`)) {
      setIsDeleting(true);
      try {
        await deleteFile(folder.id);
        onUpdate();
      } catch (error) {
        console.error('Erro ao excluir pasta:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{folder.name}</h3>
          <div className="text-xs text-gray-500 mt-1">
            Pasta • {folder.createdAt}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          className="p-1 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
          title="Abrir"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
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

export default FolderItem;