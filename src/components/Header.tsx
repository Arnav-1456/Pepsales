import React from 'react';
import { Bell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bell size={24} />
          <h1 className="text-xl font-bold">Notify</h1>
        </div>
        <nav>
          <ul className="flex gap-4">
            <li>
              <a href="#" className="hover:text-indigo-200 transition-colors">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-200 transition-colors">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;