export type currentPageOptions = "voting" | "breeds" | "gallery" | "likes" | "favourites" | "dislikes" | "";

export interface currentPageProps {
    currentPath:
    currentPageOptions;
}