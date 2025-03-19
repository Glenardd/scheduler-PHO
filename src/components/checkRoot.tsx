import { usePathname } from "next/navigation";

export default function checkRoot({children}:any) {
    
    const paths = ["/", "/calendar"];

    const pathname = usePathname();

    return (
        <>
            {!paths.includes(pathname!!) && <>{children}</>}
        </>
    );
};
