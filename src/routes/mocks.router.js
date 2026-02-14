import { Router } from "express";
import{ faker } from "@faker-js/faker";

import { generateUsers } from "../utils/mockingUsers.js";

import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

const router = Router();

router.get("/mockingpets", (req, res) => {
    const num = parseInt(req.query.num) || 100; // default 100
    const pets = [];
    for (let i = 0; i < num; i++) {
        pets.push({
            name: faker.animal.dog(),
            specie: "dog",
            adopted: false,
        });
    }
    res.json({ status: "success", payload: pets });
});

router.get("/mockingusers", (req, res) => {
  const num = parseInt(req.query.num) || 50;

  const users = generateUsers(num);
  res.json({ status: "success", payload: users });
});

router.post("/generateData", async(req,res)=> {
    try{
        const {users = 0, pets = 0 } = req.body;
        
        const newUsers= generateUsers(users);
        await userModel.insertMany(newUsers);

        const newPets= [];
        for (let i=0; i< pets; i++ ){
            newPets.push({
                name: faker.animal.cat(),
                specie: "cat",
                adopted: false,
            });

        }
        await petModel.insertMany(newPets);

        res.json({
            status:"success",
            message: `Se insertaron ${users} usuarios y ${pets} mascotas`,
        
        });

    }catch (error) {
        res.status(500).json({status: "error", error: error.message});
    }
    
});
export default router;