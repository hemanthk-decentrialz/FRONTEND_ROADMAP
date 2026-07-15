"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";

export default function Layout({
    children,
}:{
    children:React.ReactNode
}){
const router = useRouter();
const { isAuthenticated, isLoading } = useAuth();

useEffect(() => {
  if (!isLoading && !isAuthenticated) {
    router.replace("/login");
  }
}, [isAuthenticated, isLoading, router]);

if (isLoading || !isAuthenticated) {
  return null;
}

return(

<DashboardLayout>

{children}

</DashboardLayout>

);

}
