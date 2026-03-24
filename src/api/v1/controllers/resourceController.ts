import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {
    createResource,
    deleteResource,
    getAllResources,
    getResourceById,
    updateResource
} from "../services/resourceService";

const validTypes = ["article", "video", "tutorial", "documentation"];

const validateRequiredFields = (
    body: Record<string, unknown>
): string | null => {
    if (!body.title) {
        return "Missing required field: title";
    }

    if (!body.type) {
        return "Missing required field: type";
    }

    if (!body.url) {
        return "Missing required field: url";
    }

    if (typeof body.type !== "string" || !validTypes.includes(body.type)) {
        return "Invalid resource type";
    }

    return null;
};

const validateId = (idParam: string): number | null => {
    const id = Number(idParam);

    if (Number.isNaN(id)) {
        return null;
    }

    return id;
};

export const getHealthHandler = (_req: Request, res: Response): void => {
    res.status(HTTP_STATUS.OK).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
};

export const getAllResourcesHandler = (_req: Request, res: Response): void => {
    const resources = getAllResources();

    res.status(HTTP_STATUS.OK).json({
        message: "Resources retrieved",
        count: resources.length,
        data: resources
    });
};

export const getResourceByIdHandler = (req: Request, res: Response): void => {
    const id = validateId(req.params.id);

    if (id === null) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid resource ID"
        });
        return;
    }

    const resource = getResourceById(id);

    if (!resource) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Resource not found"
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Resource retrieved",
        data: resource
    });
};

export const createResourceHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const validationError = validateRequiredFields(req.body);

        if (validationError) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: validationError
            });
            return;
    }

        const newResource = createResource(req.body);

        res.status(HTTP_STATUS.CREATED).json({
            message: "Resource created",
            data: newResource
    }); 
    }
    catch(error: unknown){
        next(error)
    }

};

export const updateResourceHandler = (req: Request, res: Response): void => {
    const id = validateId(req.params.id);

    if (id === null) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid resource ID"
        });
        return;
    }

    if (
        req.body.type !== undefined &&
        (typeof req.body.type !== "string" || !validTypes.includes(req.body.type))
    ) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid resource type"
        });
        return;
    }

    const updatedResource = updateResource(id, req.body);

    if (!updatedResource) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Resource not found"
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Resource updated",
        data: updatedResource
    });
};

export const deleteResourceHandler = (req: Request, res: Response, next: NextFunction): void => {
    const id = validateId(req.params.id);

    if (id === null) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid resource ID"
        });
        return;
    }

    const deleted = deleteResource(id);

    if (!deleted) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Resource not found"
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Resource deleted"
    });
};