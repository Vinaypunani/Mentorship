const authorizeRoles = (...roles) =>{
    return (req,res,next) =>{
        if(!req.user){
            return res.status(401).json({
                error: "Unauthorized"
            })
        }

        const userRole = req.user.role;
        if(!roles.includes(userRole)){
            return res.status(403).json({
                error: "Forbidden: insufficient permissions"
            })
        }
        next();
    }
}

module.exports = authorizeRoles;