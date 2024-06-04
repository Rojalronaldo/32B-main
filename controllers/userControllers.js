const userModel =require('../models/userModels')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
// Make a function(logic)

//1.Creating user function
const createUser =async(req,res) => {
    //1.Get data from the user (fname,lname,email,pp)
    console.log(req.body);

    //#.destructuring
    const{firstName,lastName,email,password}=req.body;
    //2. validation
    if(!firstName || !lastName || !email || !password){
        return res.json({
            "sucess" :false,
            "message":"Please enter all fields!"
        })
    }
    //try-catch(Error handaling)
    try {
        //check if the user is already exist
        const existingUser = await userModel.findOne({email: email})
        if(existingUser){
            return res.json({
                "sucess":false,
                "message":"User already exists!"
            })
        }

        //hash/encrypt the password
        const randomSalt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,randomSalt)
        //save the user in database
        const newUser =new userModel({
        //fielsd :value recieved from users
        firstName : firstName,
        lastName :lastName,
        email : email,
        password:hashPassword
        })
        //actually save user in database
        await newUser.save()
        
        //send the sucess responce
        res.json({
            "sucess":true,
            "message":"User created sucessfully!"
        })
        }catch(error){
            console.log(error)
            res.json({
                "sucess":false,
                "message":"Internal Server error!"
        })
     }


}
//loh in user function
const loginUser =async(req,res) =>{
    //check in coming data
    console.log(req.body)
    //destructuring
    const{email,password} =req.body;
    //validator
    if(!email || !password){
        return res.json({
            "success":false,
            "message": "please enter all fields!"
        })
    }
    try{
        //find user,if not :stop the process
        const user = await userModel.findOne({email:email})
        if(!user){
            return res.json({
                "success":false,
                "message":"user Not Found!"
            })
        }
        // compare the password,if not :stop the process
        const isValidPassword = await bcrypt.compare (password,user.password)
        if(!isValidPassword){
            return res.json({
                "success":false,
                "message":"Incorrect password!"
            })
        }
        // generate jwt token
        // seret decryption key(.env)
        const token =await jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET
        )
        // send the token,userData,Message to the user
        res.json({
            "success":true,
            "message":"login sucessfull",
            "token":token,
            "userData":user
        })

    }catch(error){
        console.log(error)
        res.json({
            "success": false,
            "message":"Internal server error!"
        })
    }
}


    //Exporting
module.exports = { 
    createUser,
    loginUser
}