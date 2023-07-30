import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NewApplication from './component/NewApplication';
import ViewApplication from './component/ViewApplication';

function App(){
    return(
        <div>
            <BrowserRouter>
            <nav
            className="navbar navbar-expand-sm navbar-light bg-warning"
            >
                <span className="navbar-brand mx-4 fw-bolder fst-italic fs-4">Electra-Q</span>
           
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link"
                    to="/newapplication">
                        NEW APPLICATION
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link"
                    to="/viewapplication">
                        VIEW APPLICATION
                    </Link>
                </li>
            </ul>
            </nav>
            <Routes>
                  <Route path="/" element={<NewApplication />}/>
                  <Route path="/newapplication" element={<NewApplication />}/>
                  <Route path="/viewapplication" element={<ViewApplication />}/>
            </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

