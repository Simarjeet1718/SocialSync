import jwt from "jsonwebtoken"

export const generateToken=(userId,res)=>{


    // userId  is the payload that this will be used for differentiating a user from another

    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",//true if process.env.NODE_ENV is not development
      });

      return token;
    
}
//this entire function creates a cookie and sends it to the user in form of  cookie