import cors, { CorsOptions } from "cors";

/**
 * Read allowed origins from the environment variable.
 * The assignment requires a comma-separated list, so we split it into an array.
 */
const allowedOrigins: string[] = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

/**
 * CORS configuration for controlled cross-origin access.
 * Only origins listed in the environment variable are allowed.
 */
const corsOptions: CorsOptions = {
    /**
     * Allow requests from configured origins only.
     * Requests without an Origin header (such as Postman or curl) are also allowed.
     */
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error("Origin not allowed by CORS"));
    },


    methods: ["GET", "POST", "PUT", "DELETE"],


    allowedHeaders: ["Content-Type", "Authorization"],

    /**
     * Cache successful preflight responses for 10 minutes.
     * This reduces repeated OPTIONS requests from browsers.
     */
    maxAge: 600
};

export const corsConfig = cors(corsOptions);