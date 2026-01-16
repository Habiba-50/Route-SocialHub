import { UserModel } from "../../DB/model/index.js"


export const signup = async (inputs) => {
    const { userName, email, password , age } = inputs
    const checkUserExist = await UserModel.findOne({where : {email}})
    if (checkUserExist) {
        throw new Error("Email already Exist", {cause:{status:409}})
    }
    const user = await UserModel.create({ userName, email, password , age}, {fields:['userName', 'email' , 'password']} );
    return user
}

export const checkUser = async (inputs, id) => {
  const { userName, email, password , age , role} = inputs;
    
    const findUser = await UserModel.findByPk(id);
    console.log(findUser);
    
    const user= await UserModel.upsert({ userName, email, password , age , role }, { validate: false });


//   if (user) {
//     // Update
//     await UserModel.update({ password }, { validate: false });
//   } else {
//     // Create
//     await UserModel.create({ userName, email, password }, { validate: false });
//   }
  return user
};

export const checkUserEmail = async (email) => {
    const user = await UserModel.findOne({ where: { email } })
    if (!user) {
        throw new Error("No user found")
    }
    return user
}

export const checkUserId = async (id) => {
    const user = await UserModel.findByPk(id)
    if (!user) {
      throw new Error("No user found");
    }
    return user;
}