import { app } from './firebase'
import Header from './components/Header';
import { useState, createContext } from 'react';
import Home from './routes/Home';
import Login from './routes/Login';
import SignIn from './routes/SignIn';
import { Toaster } from 'react-hot-toast';
import Shopping from './components/Shopping';
import Footer from './components/Footer';
import TaskList from './components/TaskList';

export const appContext = createContext(null);

function App() {

  const [route, setRoute] = useState("home");
  const [user, setUser] = useState(null);
  
  return (
    <appContext.Provider value={{ route, setRoute, user, setUser }}>
      <Toaster />
      <Header />
      <main className='p-6 mt-20 mb-16'>
        {route === "home" && <Home />}
        {route === "login" && <Login />}
        {route === "sign in" && <SignIn />}
        {route === "shopping" && <Shopping />}
        {route === "taskList" && <TaskList />}
      </main>
      <Footer />
    </appContext.Provider>
  );
}

export default App;