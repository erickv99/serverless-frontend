import { Outlet, NavLink } from 'react-router-dom';
import './App.css';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="flex flex-col container space-y-2">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold underline text-red-400">
          Hello world!
        </h1>
        <ul className="flex space-x-2">
          <li>
            <NavLink
              to={`/`}
              className={({ isActive }) => (isActive ? 'underline' : '')}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'underline' : '')}
              to={`/upload`}
            >
              Upload
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
