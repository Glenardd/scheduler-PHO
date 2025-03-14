import { usePathname } from "next/navigation";

export default function checkRoot({children}:any) {
    
    const paths = ["/"];

    const pathname = usePathname();

    return (
        <>
            {!paths.includes(pathname!!) && <>{children}</>}
        </>
    );
};
