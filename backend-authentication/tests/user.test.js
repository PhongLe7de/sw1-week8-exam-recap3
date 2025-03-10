const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/userModel");

const mockApi = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
});

//Register
describe("User Controller", () => {
  it("should return success if sign up a new user with valid credential", async () => {
    const newUser = {
      name: "John Doe",
      username: "johndoe123",
      password: "hashedpassword123",
      phone_number: "+1234567890",
      profilePicture: "https://example.com/profile.jpg",
      gender: "Male",
      date_of_birth: "1990-01-01T00:00:00Z",
      role: "user",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "Anystate",
        zipCode: "12345",
      },
    };

    const result = await mockApi.post('/api/users/signup').send(newUser)

    expect(result.status).toBe(201)
    expect(result.body).toHaveProperty('token')
  });
});

describe("User Controller", () => {
    it("should return fail if sign up a new user with invalid credential", async () => {
      const newUser = {
        name: "John Doe",
        username: "johndoe123",
        password: "hashedpassword123",
      };
  
      const result = await mockApi.post('/api/users/signup').send(newUser)
  
      expect(result.status).toBe(400)
    });
  });

//Login 
describe("User Controller", () => {
    it("should return success if login a new user with valid credential", async () => {
      const newUser = {
        username: "johndoe123",
        password: "hashedpassword123",
      };
  
      const result = await mockApi.post('/api/users/login').send(newUser)
  
      expect(result.status).toBe(200)
      expect(result.body).toHaveProperty('token')
    });
  });

  describe("User Controller", () => {
    it("should return fail if login a new user with invalid credential", async () => {
      const newUser = {
        username: "johndoe",
        password: "hashedpass",
      };
  
      const result = await mockApi.post('/api/users/login').send(newUser)
  
      expect(result.status).toBe(400)
    });
  });
