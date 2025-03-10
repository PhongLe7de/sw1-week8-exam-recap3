const supertest = require('supertest');
const app = require('../app'); 
const User = require('../models/userModel'); 
const Property = require('../models/propertyModel'); 

const mockApi = supertest(app);

const mockUser = {
  name: 'John Doe',
  username: 'johndoe',
  password: 'hashedpassword123', 
  phone_number: '+1234567890',
  gender: 'Male',
  date_of_birth: new Date('1990-01-01'),
  role: 'user',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'Anystate',
    zipCode: '12345'
  }
}

const properties = [{
  "title": "Luxury Apartment in Downtown",
  "type": "Apartment",
  "description": "A spacious 2-bedroom luxury apartment located in the heart of the city with modern amenities.",
  "price": 250000,
  "location": {
    "address": "123 Main St",
    "city": "Anytown",
    "state": "Anystate",
    "zipCode": "12345"
  },
  "squareFeet": 1500,
  "yearBuilt": 2020
}]

describe('Property Controller', () => {
  let token;
  let propertyId;
  beforeAll(async () => {
    const user = await User.create(mockUser);
    const response = await mockApi
      .post('/api/users/login')
      .send({
        username: 'johndoe123',
        password: 'hashedpassword123'
      });

    token = response.body.token; 
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Property.deleteMany({});
    await Property.insertMany(properties);
  });

  it("should return all jobs as JSON when GET /api/jobs is called", async () => {
    const response = await mockApi
      .get("/api/properties/")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(properties.length);
  });

  it('should return fail if create new property missing require field', async () => {
    const newProperty = {
      title: 'Luxury Apartment in Downtown',
      type: 'Apartment',
      description: 'A spacious 2-bedroom luxury apartment located in the heart of the city with modern amenities.',
      price: 250000,
    };

    const response = await mockApi
      .post('/api/properties')
      .set('Authorization', `Bearer ${token}`)  
      .send(newProperty);

    expect(response.status).toBe(400); 
  });

  it('should return success if create new property successful', async () => {
    const newProperty = {
      title: 'Luxury Apartment in Downtown',
      type: 'Apartment',
      description: 'A spacious 2-bedroom luxury apartment located in the heart of the city with modern amenities.',
      price: 250000,
      location: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'Anystate',
        zipCode: '12345'
      },
      squareFeet: 1500,
      yearBuilt: 2020
    };

    const response = await mockApi
      .post('/api/properties')
      .set('Authorization', `Bearer ${token}`)  
      .send(newProperty);
    propertyId = response.body._id
    expect(response.status).toBe(201); 
    expect(response.body).toHaveProperty('title', 'Luxury Apartment in Downtown');
  });

  it('should return fail if update property with invalid property id', async () => {
    const propertyId = '12345'
    const newProperty = {
      title: 'Luxury Apartment in Downtown',
      type: 'Apartment',
      description: 'A spacious 2-bedroom luxury apartment located in the heart of the city with modern amenities.',
      price: 250000,
      location: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'Anystate',
        zipCode: '12345'
      },
      squareFeet: 1500,
      yearBuilt: 2020
    };

    const response = await mockApi
      .put(`/api/properties/${propertyId}`)
      .set('Authorization', `Bearer ${token}`)  
      .send(newProperty);

    expect(response.status).toBe(400); 
  });

  it('should return success if update property successful', async () => {
    const newProperty = {
      title: 'Luxury Apartment in Downtown New',
      type: 'Apartment',
      description: 'A spacious 2-bedroom luxury apartment located in the heart of the city with modern amenities.',
      price: 250000,
      location: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'Anystate',
        zipCode: '12345'
      },
      squareFeet: 1500,
      yearBuilt: 2020
    };

    const response = await mockApi
      .put(`/api/properties/${propertyId}`)
      .set('Authorization', `Bearer ${token}`)  
      .send(newProperty);

    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty('title', 'Luxury Apartment in Downtown New');
  });

  it('should return fail if delete property with invalid property id', async () => {
    const propertyId = '12345'
    const response = await mockApi
      .put(`/api/properties/${propertyId}`)
      .set('Authorization', `Bearer ${token}`)  
    expect(response.status).toBe(400); 
  });

  it('should return success if delete property successful', async () => {
    const response = await mockApi
      .put(`/api/properties/${propertyId}`)
      .set('Authorization', `Bearer ${token}`)  

    expect(response.status).toBe(200); 
  });
});

