import './App.css'
import { Routes, Route } from 'react-router-dom';
import QOne from './DataFetching';
import Layout from './Layout';
import Login from './Login';
import TodoList from './TodoList';
import { FormProvider } from "./context/FormContext";
import DataFetching from './DataFetching';


function App() {
  return (
    <FormProvider>
      <Routes>
        <Route index element={<Layout><QOne /></Layout>} />
        <Route path='login' element={<Layout><Login /></Layout>} />
        <Route path="datafetching" element={<Layout><DataFetching /></Layout>} />
        <Route path="todolist" element={<Layout><TodoList /></Layout>} />
      </Routes>
    </FormProvider>
  )
}

export default App;
