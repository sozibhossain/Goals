

export type SidebarContentType = {
    id: number;
    name: string;
    href: string;
};

export const Sidebarcontents: SidebarContentType[] = [
    {
        id: 1,
        name: "Header",
        href: "/dashboard",
    },
    {
        id: 2,
        name: "Banner section",
        href: "/dashboard/banner",
    },
    {
        id: 3,
        name: "Features",
        href: "/dashboard/features",
    },
    {
        id: 4,
        name: "MobileMockup",
        href: "/dashboard/mobile-mockup",
    },
    {
        id: 5,
        name: "Achieve-section",
        href: "/dashboard/achieve-section",
    },
    {
        id: 6, 
        name: "Footer",
        href: "/dashboard/footer",
    },
];