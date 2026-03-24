import Joi, { ObjectSchema } from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - userId
 *         - content
 *       properties:
 *         userId:
 *           type: string
 *           description: The user's identifier who created the resource
 *           example: "user123"
 *         content:
 *           type: string
 *           description: The content of the resource item
 *           example: "test content"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the item was created
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the item was last updated
 *           example: "2024-01-20T14:45:00Z"
 */

// Resource operation schemas organized by request part
export const resourceSchemas = {
    // POST /resources - Create new resource
    create: {
        body: Joi.object({
            userId: Joi.string().required().messages({
                "any.required": "User ID is required",
                "string.empty": "User ID cannot be empty",
            }),
            content: Joi.string().required().messages({
                "any.required": "Content is required",
                "string.empty": "Content cannot be empty",
            }),
        }),
    },

    // GET /resources/:id - Get single resource
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Resource ID is required",
                "string.empty": "Resource ID cannot be empty",
            }),
        }),
        query: Joi.object({
            include: Joi.string().valid("comments", "author").optional(),
        }),
    },

    // PUT /resources/:id - Update resource
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Resource ID is required",
                "string.empty": "Resource ID cannot be empty",
            }),
        }),
        body: Joi.object({
            content: Joi.string().optional().messages({
                "string.empty": "Content cannot be empty",
            }),
        }),
    },

    // DELETE /resources/:id - Delete resource
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Post ID is required",
                "string.empty": "Post ID cannot be empty",
            }),
        }),
    },
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       required:
 *         - error
 *         - message
 *       properties:
 *         error:
 *           type: string
 *           description: Error type or code
 *           example: "VALIDATION_ERROR"
 *         message:
 *           type: string
 *           description: Human-readable error message
 *           example: "The uid and email fields are required"
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "email"
 *               issue:
 *                 type: string
 *                 example: "must be a valid email address"
 *           description: Detailed validation errors (optional)
 */