import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

export const generateUsers = (num) =>{
    const users = [];
    const hashedPassword = bcrypt.hashSync("coder123",10);

    for( let i=0; i<num; i++) {
        users.push({
          _id: faker.database.mongodbObjectId(),
           first_name: faker.person.firstName(),  
           last_name: faker.person.lastName(),    
           email: faker.internet.email(),         
           password: hashedPassword,              
           role: faker.helpers.arrayElement(["user", "admin"]), 
           pets: [],                              
        });
    }
     return users;
}
