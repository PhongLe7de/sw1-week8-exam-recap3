import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPropertyPage = ({ setPropertyAdded }) => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [type, setType] = useState("Apartment");
  const [yearBuilt, setYearBuilt] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const propertyTypes = ["Apartment", "House", "Condo", "Commercial"];
  
  const formFields = [
    { label: "Property Title", value: title, setValue: setTitle, type: "text" },
    { label: "Property Description", value: description, setValue: setDescription, type: "textarea" },
    { label: "Price", value: price, setValue: setPrice, type: "number" },
    { label: "Address", value: address, setValue: setAddress, type: "text" },
    { label: "City", value: city, setValue: setCity, type: "text" },
    { label: "State", value: state, setValue: setState, type: "text" },
    { label: "Zip Code", value: zipCode, setValue: setZipCode, type: "text" },
    { label: "Square Feet", value: squareFeet, setValue: setSquareFeet, type: "number" },
    { label: "Year Built", value: yearBuilt, setValue: setYearBuilt, type: "number" },
  ];

  const addProperty = async (newProperty) => {
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProperty),
      });
      if (!res.ok) {
        throw new Error("Failed to add property");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newProperty = {
      title,
      type,
      description,
      price,
      location: {
        address,
        city,
        state,
        zipCode,
      },
      squareFeet,
      yearBuilt,
    };

    addProperty(newProperty);
    setPropertyAdded(true);
    navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a New Property</h2>
      <form onSubmit={submitForm}>
        {formFields.map(({ label, value, setValue, type }) => (
          <div key={label}>
            <label>{label}:</label>
            {type === "textarea" ? (
              <textarea
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
              ></textarea>
            ) : (
              <input
                type={type}
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            )}
          </div>
        ))}

        <label>Property Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {propertyTypes.map((propertyType) => (
            <option key={propertyType} value={propertyType}>
              {propertyType}
            </option>
          ))}
        </select>

        <button>Add Property</button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
