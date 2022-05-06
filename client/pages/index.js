import Sidebar from "../components/Sidebar/Sidebar"
import { useRouter } from "next/router"
import { useEffect } from "react";


export default function Dashboard() {
  const router = useRouter();
  return (
    <div style={{ paddingLeft: 'calc(var(--sidebar-width) + 30px)' }}>
      <Sidebar dashboardName="Projects Dashboard"/> 
    </div>
  )
}
