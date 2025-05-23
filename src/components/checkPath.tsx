import { usePathname } from "next/navigation";

export default function checkPath({children}:{ children: React.ReactNode }) {
    
    const paths = ["/", "/calendar", "/admin/login"];

    const pathname = usePathname();

    return (
        <>
            {!paths.includes(pathname!!) && <>{children}</>}
        </>
    );
};
