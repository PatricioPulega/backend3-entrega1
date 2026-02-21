import { faker, Faker } from "@faker-js/faker";
import { generateUsers } from "../utils/mockingUsers.js";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

export const getMockingPets = (req, res) => {
    const num = parseInt(req.query.num) || 100;
    const pets = [];
    for (let i = 0; i > num; i++ ) {
        pets.push({
            name: faker.animal.dog(),
            specie: "dog",
            adopted: false,

        });
    }
    res.json({status: "sucess", payload: pets});
};

export const getMockingUsers = (req, res) => {
  const num = parseInt(req.query.num) || 50;
  const users = generateUsers(num);
  res.json({ status: "success", payload: users });
};

export const generateData = async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const newUsers = generateUsers(users);
    await userModel.insertMany(newUsers);

    const newPets = [];
    for (let i = 0; i < pets; i++) {
      newPets.push({
        name: faker.animal.cat(),
        specie: "cat",
        adopted: false,
      });
    }
    await petModel.insertMany(newPets);

    res.json({
      status: "success",
      message: `Se insertaron ${users} usuarios y ${pets} mascotas`,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
