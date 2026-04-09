import { Navigate, type RouteObject } from "react-router-dom"
import Dashboard from "@/pages/dashboard"
import ProfilePage from "@/pages/profile"
import LeavePage from "@/pages/leave"
import PayrollPage from "@/pages/payroll"
import NotFoundPage from "@/pages/not-found"
import MyRequestsPage from "@/pages/my-requests"
import RequestDetailsPage from "@/pages/request-details"
import AttendancePage from "./pages/attendance"
import DocumentsPage from "./pages/documents"
import HelpdeskPage from "./pages/helpdesk"

export type AppRouteKey = "dashboard" | "profile" | "leave" | "payroll" | "myRequests" | "myRequests" | "attendance" | "documents" | "helpdesk"

export const appPaths: Record<AppRouteKey, string> = {
  dashboard: "/dashboard",
  profile: "/profile",
  leave: "/leave",
  payroll: "/payroll",
  myRequests: "/my-requests",
  attendance: "/attendance",
  documents: "/documents",
  helpdesk: "/helpdesk",
}

export const appRoutes: RouteObject[] = [
  { path: "/", element: <Navigate to={appPaths.dashboard} replace /> },
  { path: appPaths.dashboard, element: <Dashboard /> },
  { path: appPaths.profile, element: <ProfilePage /> },
  { path: appPaths.leave, element: <LeavePage /> },
  { path: appPaths.payroll, element: <PayrollPage /> },
  { path: "*", element: <NotFoundPage /> },
  { path: appPaths.myRequests, element: <MyRequestsPage /> },
  { path: "/my-requests/:id", element: <RequestDetailsPage /> },
  { path: appPaths.attendance, element: <AttendancePage /> },
  { path: appPaths.documents, element: <DocumentsPage /> },
  { path: appPaths.helpdesk, element: <HelpdeskPage /> },
]