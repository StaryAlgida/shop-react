import './App.css'
import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";

function App() {
    return (
        <div className='container-xxl'>
            <Header/>
            <section>
                <Outlet/>
            </section>
        </div>
    )
}

export default App
