import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 2 });
        if (decision.isDenied()) {
            
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Too Many Requests - Rate limit exceeded" });
            }
            if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Forbidden - Bot traffic detected" });
            }

            return res.status(403).json({ message: "Forbidden - Access denied by Arcjet" });
        }

        next();
        
    } catch (error) {
        console.error("Arcjet Middleware Error:", error); 
        next(error);
    }
}

export default arcjetMiddleware;