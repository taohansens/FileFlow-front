import { useAuth } from '../../context/AuthContext';
import Button from '../UI/Button';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-primary text-xl font-bold">FileFlow</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="flex items-center">
                <span className="mr-4 text-sm text-gray-700">
                  Olá, {currentUser?.email || 'Usuário'}
                </span>
                <Button 
                  variant="secondary" 
                  onClick={logout}
                >
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;