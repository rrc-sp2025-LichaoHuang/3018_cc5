import Joi, { ObjectSchema } from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - Id
 *         - title
 *         - type
 *         - url
 *         - description
 *         - createdAt
 *       properties:
 *         id:
 *           type: number
 *           description: Unique identifier
 *           example: 123
 *         title:
 *           type: string
 *           description: Resource title
 *           example: "title"
 *         type:
 *           type: string
 *           description: Type: article, video, tutorial, documentation
 *           example: "article"
 *         url:
 *           type: string
 *           description: Link to the resource
 *           example: "https:www.google.com"
 *         description:
 *           type: string
 *           description: Brief description
 *           example: "this is example"
 *         updatedAt:
 *           type: string
 *           format: ISO
 *           description: Creation timestamp (ISO format)
 *           example: "2024-01-20T14:45:00Z"
 */

// Resource operation schemas organized by request part
export const resourceSchemas = {
    // POST /resources - Create new resource
    create: {
        body: Joi.object({
            id: Joi.number().required().messages({
                "any.required": "ID is required",
                "number.empty": "ID cannot be empty",
            }),
            title: Joi.string().required().messages({
                "any.required": "Content is required",
                "string.empty": "Content cannot be empty",
            }),
            type: Joi.string().required().messages({
                "any.required": "type is required",
                "string.empty": "type cannot be empty",
            })
            .valid("article", "video", "tutorial", "documentation"),
            url: Joi.number().required().messages({
                "any.required": "url is required",
                "number.empty": "url cannot be empty",
            }),
            description: Joi.number().required().messages({
                "any.required": "description is required",
                "number.empty": "description cannot be empty",
            }),
            updatedAt: Joi.number().required().messages({
                "any.required": "updatedAt is required",
                "number.empty": "updatedAt cannot be empty",
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