import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
// pages & components
import Home from "./pages/HomePage";
import AddPropertyPage from "./pages/AddPropertyPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage"
import PropertyPage from "./pages/PropertyPage";

const App = () => {
  const [propertyAdded, setPropertyAdded] = useState(false);
  const [propertyEdited, setPropertyEdited] = useState(false);
  const [propertyDeleted, setPropertyDeleted] = useState(false);
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-property" element={<AddPropertyPage />} />
              <Route
              path="/properties/:id"
              element={<PropertyPage setPropertyDeleted={setPropertyDeleted} />}
            />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
