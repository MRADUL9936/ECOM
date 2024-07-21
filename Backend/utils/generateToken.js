import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie=(userId,res)=>{

  const token=jwt.sign({userId}, process.env.JWTSECRET
    ,{expiresIn:'30d'});

    res.cookie("Ecom",token,{
        maxAge:30*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict"
        })
}

export default generateTokenAndSetCookie;