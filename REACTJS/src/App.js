import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/UserComponents/Header'
import TableUser from './components/UserComponents/TableUser';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <TableUser />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
    </>
  );
}

export default App;
