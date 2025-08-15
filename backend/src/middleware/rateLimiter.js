import rateLimit from "../config/upstash.js";

const rateLimiter = async(req, res, next) => {
    try {
        const {success} = await rateLimit.limit("my-rate-limit");

        if(!success) {
            return res.status(429).json({ error: "Rate limit exceeded" });
        }

        next();
    } catch (error) {
        console.error("Rate limiter error:", error);
        next(error);
    }
};

export default rateLimiter;