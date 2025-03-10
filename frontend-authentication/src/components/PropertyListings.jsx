import PropertyListing from "./PropertyListing";


const PropertyListings = ({ properties }) => {
  
  return (
    <div className="property-list">
      {properties.map((property, index) => (
        <PropertyListing key={index} property={property} />
      ))}
    </div>
  );
};

export default PropertyListings;
