import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Routers from './Routers/Routers';

function App() {
  return (
    <RouterProvider router={Routers}></RouterProvider>
  );
}

export default App;
