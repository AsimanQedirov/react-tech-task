import './App.css'
import {Route, Routes} from "react-router-dom";
import Customers from "./pages/customer/Customers";
import CreditAppeal from "./pages/credit-appeal/CreditAppeal";

function App() {
    return (
        <div className={"App"}>
            <Routes>
                <Route path="/" element={<Customers/>}/>
                <Route path="/credit-appeal/:id" element={<CreditAppeal/>}/>
            </Routes>
        </div>
    )
}

export default App
