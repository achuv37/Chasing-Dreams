import React from 'react';

// Nav component
function Nav(props) {
  const tabs = ['Home', 'Attractions', 'Hotels', 'Login/Signup'];
  
  return (
    <ul className="nav nav-tabs">
      {tabs.map(tab => (
        <li className={
          props.currentPage ===tab ?"nav-item is-active" : "nav-item"
         } key={tab}>
          <a
            href={'#' + tab.toLowerCase()}
            onClick={() => props.handlePageChange(tab)}
            className={
              props.currentPage === tab ? 'nav-link active' : 'nav-link'
            }
          >
            {tab}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Nav;
  
  
