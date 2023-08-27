export type currentPageOptions = "voting" | "breeds" | "gallery" | "likes" | "favourites" | "dislikes" | "search" | "";

export interface currentPageProps {
    currentPath:
    currentPageOptions;
}