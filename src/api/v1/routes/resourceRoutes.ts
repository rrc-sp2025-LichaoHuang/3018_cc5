import { Router } from "express";
import {
    createResourceHandler,
    deleteResourceHandler,
    getAllResourcesHandler,
    getHealthHandler,
    getResourceByIdHandler,
    updateResourceHandler
} from "../controllers/resourceController";

const router = Router();

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Get API health status
 *     description: Returns health check data including uptime, timestamp, and API version.
 *     responses:
 *       200:
 *         description: Health check returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
router.get("/health", getHealthHandler);

/**
 * @openapi
 * /api/v1/resources:
 *   get:
 *     summary: Get all resources
 *     description: Returns all educational resources with a count.
 *     responses:
 *       200:
 *         description: Resources retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resources retrieved
 *                 count:
 *                   type: number
 *                   example: 4
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Resource'
 */
router.get("/resources", getAllResourcesHandler);

/**
 * @openapi
 * /api/v1/resources/{id}:
 *   get:
 *     summary: Get a single resource by ID
 *     description: Returns one resource if it exists.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Resource ID
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Resource retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resource retrieved
 *                 data:
 *                   $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.get("/resources/:id", getResourceByIdHandler);

/**
 * @openapi
 * /api/v1/resources:
 *   post:
 *     summary: Create a new resource
 *     description: Creates a new educational resource. Title, type, and url are required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResourceInput'
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resource created
 *                 data:
 *                   $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Bad request due to missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.post("/resources", createResourceHandler);

/**
 * @openapi
 * /api/v1/resources/{id}:
 *   put:
 *     summary: Update an existing resource
 *     description: Updates an existing resource by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Resource ID
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResourceInput'
 *     responses:
 *       200:
 *         description: Resource updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resource updated
 *                 data:
 *                   $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Bad request due to invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.put("/resources/:id", updateResourceHandler);

/**
 * @openapi
 * /api/v1/resources/{id}:
 *   delete:
 *     summary: Delete a resource
 *     description: Deletes a resource by ID if it exists.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Resource ID
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resource deleted
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.delete("/resources/:id", deleteResourceHandler);

export default router;