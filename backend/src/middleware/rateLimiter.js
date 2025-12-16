
import ratelimit from "../config/upstash.js";
const rateLimiter=async(req,res,next)=>{
    //per user basis rate limiting

    try {
        const { success } = await ratelimit.limit("here-userid-or-ip");

        if (!success) {
        return res.status(429).json(
            { message: "Too many requests. Please try again later." }
        )
    };

        next();

    }   catch (error) {
        console.log("Rate Limiter Error:", error);
        next(error);

        
    }

};

export default rateLimiter;