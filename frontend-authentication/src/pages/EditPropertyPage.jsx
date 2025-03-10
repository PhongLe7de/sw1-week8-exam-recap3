import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPropertyPage = ({ setPropertyEdited }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);

  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const propertyTypes = ["Apartment", "House", "Condo", "Commercial"];

  const updateProperty = async (property) => {
    try {
      const res = await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(property),
      });
      if (!res.ok) throw new Error("Failed to update property");
      return res.ok;
    } catch (error) {
      console.error("Error updating property:", error);
      return false;
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProperty(data);
        setType(data.type);
        setTitle(data.title);
        setPrice(data.price);
        setCity(data.location.city);
        setYearBuilt(data.yearBuilt);
        setState(data.location.state);
        setSquareFeet(data.squareFeet);
        setDescription(data.description);
        setZipCode(data.location.zipCode);
        setAddress(data.location.address);
      } catch (error) {
        console.error("Failed to fetch property:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const updatedProperty = {
      id,
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

    const success = await updateProperty(updatedProperty);
    if (success) {
      setPropertyEdited(true);
      navigate(`/properties/${id}`);
    } else {

    }
  };

  const formFields = [
    { label: "Property title", value: title, setValue: setTitle, type: "text" },
    { label: "Property Description", value: description, setValue: setDescription, type: "textarea" },
    { label: "Price", value: price, setValue: setPrice, type: "number" },
    { label: "Address", value: address, setValue: setAddress, type: "text" },
    { label: "City", value: city, setValue: setCity, type: "text" },
    { label: "State", value: state, setValue: setState, type: "text" },
    { label: "Zip Code", value: zipCode, setValue: setZipCode, type: "text" },
    { label: "Square Feet", value: squareFeet, setValue: setSquareFeet, type: "number" },
    { label: "Year Built", value: yearBuilt, setValue: setYearBuilt, type: "number" },
  ];

  return (
    <div className="create">
      <h2>Update Property</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
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

          <button>Update Property</button>
        </form>
      )}
    </div>
  );
};

export default EditPropertyPage;
