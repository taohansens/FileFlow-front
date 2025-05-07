import { useState } from 'react';
import { createFolder, deleteFolder } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';

const FolderList = ({ folders, currentFolder, onFolderChange, onRefresh }) => {
  const [newFolderName, setNewFolderName] = useState('');
  const { token } = useAuth();

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return alert('O nome da pasta não pode estar vazio.');
    try {
      await createFolder(newFolderName, token);
      alert('Pasta criada com sucesso!');
      setNewFolderName('');
      onRefresh();
    } catch (error) {
      alert(error.message || 'Erro ao criar pasta.');
    }
  };

  const handleDeleteFolder = async (folderId) => {
    if (confirm('Tem certeza que deseja excluir esta pasta?')) {
      try {
        await deleteFolder(folderId, token);
        alert('Pasta deletada com sucesso!');
        onRefresh();
      } catch (error) {
        alert(error.message || 'Erro ao deletar pasta.');
      }
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Nova pasta"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="input"
        />
        <button onClick={handleCreateFolder} className="btn btn-primary">
          Criar
        </button>
      </div>

      <ul className="space-y-2">
        {folders.map((folder) => (
          <li
            key={folder.id}
            className={`p-2 rounded-lg cursor-pointer ${
              folder.id === currentFolder.id ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => onFolderChange(folder)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                </div>
                <span>{folder.name}</span>
              </div>
              {folder.id !== 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFolder(folder.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderList;