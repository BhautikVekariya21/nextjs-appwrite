"use client";
import appwriteService from "@/appwrite/config";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React, {useEffect} from "react";

const LogoutPage = () => {
    const router = useRouter();
    const {setAuthStatus} = useAuth();

    useEffect(() => {
        appwriteService.logout()
        .then(() => {
            setAuthStatus(false);
            router.replace("/");
        })
    }, [router, setAuthStatus]);

    return(
        <></>
    )
}


export default LogoutPage;