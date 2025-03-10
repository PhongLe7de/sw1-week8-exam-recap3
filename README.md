# Usage

1. **Self-assessment**

   - I used map to render allthe field of form instead of rendering field by field

   ```javascript
   const formFields = [
     {
       label: "Property title",
       value: title,
       setValue: setTitle,
       type: "text",
     },
     {
       label: "Property Description",
       value: description,
       setValue: setDescription,
       type: "textarea",
     },
     { label: "Price", value: price, setValue: setPrice, type: "number" },
     { label: "Address", value: address, setValue: setAddress, type: "text" },
     { label: "City", value: city, setValue: setCity, type: "text" },
     { label: "State", value: state, setValue: setState, type: "text" },
     { label: "Zip Code", value: zipCode, setValue: setZipCode, type: "text" },
     {
       label: "Square Feet",
       value: squareFeet,
       setValue: setSquareFeet,
       type: "number",
     },
     {
       label: "Year Built",
       value: yearBuilt,
       setValue: setYearBuilt,
       type: "number",
     },
   ];
   ```

   ```javascript
   {
     formFields.map(({ label, value, setValue, type }) => (
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
     ));
   }
   ```


2. **Self-grading**
   - In my opinion mt code is well-structured, clear, and scalable. So I think my grade can be 5


