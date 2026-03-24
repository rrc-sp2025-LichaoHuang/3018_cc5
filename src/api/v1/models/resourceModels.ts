export interface Resource {
    id: number;
    title: string;
    type: "article" | "video" | "tutorial" | "documentation";
    url: string;
    description: string;
    createdAt: string;
}

export interface ResourceInput {
    title: string;
    type: "article" | "video" | "tutorial" | "documentation";
    url: string;
    description?: string;
}

