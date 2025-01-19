import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className='w-[95%]  mx-auto sm:w-[97%] sm:mx-auto'>
        <section className='w-full'>
          <Outlet />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
