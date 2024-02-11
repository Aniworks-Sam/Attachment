import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import SignIn from './components/Auth/SignIn';
import Attachments from './pages/Attachments';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SignIn/> } />
        <Route path="/attachments" element={<Attachments />} />
      </Routes>
    </Layout>
  );
};

export default App;
