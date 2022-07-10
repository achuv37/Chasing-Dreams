// Importing
import React, { useMemo, useState } from 'react';
import Nav from '../Nav'
import Home from '../Home';
import Attractions from '../Attractions';
import Login from '../Login';
import Signup from '../Signup'
import Hotels from '../Hotels';

//Header component
function Header() {
  const [currentPage, handlePageChange] = useState('Home');
  
  // Renderpage function
  const renderPage = useMemo(() => () => {

  // Add a switch statement that will return the appropriate component of the 'currentPage'
    switch (currentPage) {
      case 'Home':
        return <Home />;
      case 'Attractions':
        return <Attractions />;
      case 'Hotels':
        return <Hotels />;
      case 'Login':
        return <Login />; 
      default:
        return <Home />;
    }
  }, [currentPage]);

  return (
    <div>
      <section className='header'>
      <nav className='navbar'>
        <div className='navbar-brand'>
          <h1>
            <a className='navbar-item' href="/"> Chasing-dreams</a>
          </h1>
        </div>

      </nav>
      <div>
        <Nav currentPage={currentPage} 
        handlePageChange={handlePageChange}></Nav>
      </div>
      </section>
      <main>
      {
      // Render the component returned by 'renderPage()'
          renderPage()
        }
      </main>
    </div>
  );
}

// exporting 
export default Header;

