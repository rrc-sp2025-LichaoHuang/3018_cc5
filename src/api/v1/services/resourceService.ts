
import { Resource, ResourceInput } from "../models/resourceModels";

const initialResources: Resource[] = [
    {
        id: 1,
        title: "Express.js Guide",
        type: "documentation",
        url: "https://expressjs.com/en/guide",
        description: "Official Express.js documentation",
        createdAt: "2025-02-20T10:00:00.000Z"
    },
    {
        id: 2,
        title: "TypeScript Basics",
        type: "video",
        url: "https://example.com/ts-basics",
        description: "Introduction to TypeScript",
        createdAt: "2025-02-20T10:05:00.000Z"
    },
    {
        id: 3,
        title: "REST API Design",
        type: "article",
        url: "https://example.com/rest-design",
        description: "Best practices for REST API design",
        createdAt: "2025-02-20T10:10:00.000Z"
    },
    {
        id: 4,
        title: "Jest Testing Tutorial",
        type: "tutorial",
        url: "https://example.com/jest-tutorial",
        description: "Complete guide to testing with Jest",
        createdAt: "2025-02-20T10:15:00.000Z"
    }
];

let resources: Resource[] = [...initialResources];

export const getAllResources = (): Resource[] => {
    return resources;
};

export const getResourceById = (id: number): Resource | null => {
    const resource = resources.find((item) => item.id === id);
    return resource || null;
};

export const createResource = (resourceInput: ResourceInput): Resource => {
    const nextId =
        resources.length > 0
            ? Math.max(...resources.map((resource) => resource.id)) + 1
            : 1;

    const newResource: Resource = {
        id: nextId,
        title: resourceInput.title,
        type: resourceInput.type,
        url: resourceInput.url,
        description: resourceInput.description || "",
        createdAt: new Date().toISOString()
    };

    resources.push(newResource);
    return newResource;
};

export const updateResource = (
    id: number,
    resourceInput: Partial<ResourceInput>
): Resource | null => {
    const resource = resources.find((item) => item.id === id);

    if (!resource) {
        return null;
    }

    if (resourceInput.title !== undefined) {
        resource.title = resourceInput.title;
    }

    if (resourceInput.type !== undefined) {
        resource.type = resourceInput.type;
    }

    if (resourceInput.url !== undefined) {
        resource.url = resourceInput.url;
    }

    if (resourceInput.description !== undefined) {
        resource.description = resourceInput.description;
    }

    return resource;
};

export const deleteResource = (id: number): boolean => {
    const originalLength = resources.length;
    resources = resources.filter((item) => item.id !== id);
    return resources.length < originalLength;
};

/**
 * Test helper to reset in-memory data between tests.
 */
export const resetResources = (): void => {
    resources = [...initialResources];
};