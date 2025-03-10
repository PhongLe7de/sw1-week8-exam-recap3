import { Link } from "react-router-dom";
const PropertyListing = ({ property }) => {
  return (
    <div className="property-preview">
      <Link to={`/properties/${property._id}`}>
        <h2>{property.title}</h2>
      </Link>
      <p>Type: {property.type}</p>
      <p>Description: {property.description}</p>
    </div>
  );
};

export default PropertyListing;
