import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PropertyPage = ({ setPropertyDeleted }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const deleteProperty = async (id) => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log("id: ", id);
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const onDeleteClick = (propertyId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?" + propertyId
    );
    if (!confirm) return;
    deleteProperty(propertyId);
    setPropertyDeleted(true);
    navigate("/");
  };

  return (
    <div className="property-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{property.title}</h2>
          <p>Type: {property.type}</p>
          <p>Description: {property.description}</p>
          <button onClick={() => onDeleteClick(property._id)}>Delete</button>
          <button>
            <Link to={`/edit-property/${property._id}`}>Edit</Link>
          </button>
        </>
      )}
    </div>
  );
};

export default PropertyPage;
