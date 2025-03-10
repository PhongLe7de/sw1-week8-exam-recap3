import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import PropertyPage from "./pages/PropertyPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";

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
            <Route
              path="/"
              element={
                <Home
                  propertyAdded={propertyAdded}
                  propertyEdited={propertyEdited}
                  propertyDeleted={propertyDeleted}
                />
              }
            />
            <Route
              path="/add-property"
              element={<AddPropertyPage setPropertyAdded={setPropertyAdded} />}
            />
            <Route
              path="/properties/:id"
              element={<PropertyPage setPropertyDeleted={setPropertyDeleted} />}
            />
            <Route
              path="/edit-property/:id"
              element={
                <EditPropertyPage setPropertyEdited={setPropertyEdited} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
