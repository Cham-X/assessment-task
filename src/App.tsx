import './App.css'
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import TodoList from './TodoList';
import { FormProvider } from "./context/FormContext";
import DataFetching from './DataFetching';
import Login from './Login';
import MultiStepForm from './MultiWizardForm';


function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path='/' element={<Layout><Login /></Layout>} />
        <Route path="datafetching" element={<Layout><DataFetching /></Layout>} />
        <Route path="todolist" element={<Layout><TodoList /></Layout>} />
        <Route path='multiform' element={<Layout><MultiStepForm /></Layout>} />
      </Routes>
    </FormProvider>
  )
}

export default App;
