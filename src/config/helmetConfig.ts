import helmet from "helmet";

/**
 * Helmet configuration for a JSON API.
 * These choices are intentionally different from a browser-rendered website.
 */
export const helmetConfig = helmet({
    /**
     * Disable Content Security Policy.
     * CSP is mainly useful for HTML pages rendered in browsers to control
     * what scripts, styles, and other assets can load.
     * This project returns JSON responses, not browser-rendered pages.
     */
    contentSecurityPolicy: false,

    /**
     * Deny framing entirely.
     * This helps protect against clickjacking if someone tries to embed
     * the API in a frame or iframe.
     */
    frameguard: { action: "deny" },

    /**
     * Hide the X-Powered-By header.
     * This reduces unnecessary exposure of implementation details.
     */
    hidePoweredBy: true,

    /**
     * Enable HSTS only in production.
     * HSTS tells browsers to always use HTTPS for future requests.
     * It is appropriate in production when HTTPS is actually in use,
     * but can cause confusion during local development on HTTP.
     */
    hsts: process.env.NODE_ENV === "production"
});