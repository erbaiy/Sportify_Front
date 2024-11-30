
'use client'

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiDish } from "react-icons/bi";
import { RiPieChartLine } from "react-icons/ri";
import { LayoutDashboard, Settings, Users, Grid, Menu, PieChart } from "lucide-react";
import { GrSort } from "react-icons/gr";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes
import Participants from './../pages/Dashboard/registration/participants';


export default function Layout({ children }) {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Sportify</h2>
          
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-200 ${
                  selectedItem === "Dashboard" ? "bg-gray-200" : ""
                }`}
                to="/dashboard"
                onClick={() => handleItemClick("Dashboard")}
              >
                <LayoutDashboard size={20} />
                <span>Sportify</span>
              </Link>
            </li>
            {/* <li>
              <Link
                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-200 ${
                  selectedItem === "Report" ? "bg-gray-200" : ""
                }`}
                to="/report"
                onClick={() => handleItemClick("Report")}
              >
                <PieChart size={20} />
                <span>Report</span>
              </Link>
            </li> */}
            <li>
              <Link
                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-200 ${
                  selectedItem === "Menu" ? "bg-gray-200" : ""
                }`}
                to="/menu"
                onClick={() => handleItemClick("Menu")}
              >
                <Menu size={20} />
                <span>Menu</span>
              </Link>
            </li>
            <li>
              <Link
                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-200 ${
                  selectedItem === "Users List" ? "bg-gray-200" : ""
                }`}
                to="/event"
                onClick={() => handleItemClick("Users List")}
              >
                <GrSort size={18} />
                <span>Event List</span>
              </Link>
            </li>
            {/* <li>
              <Link
                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-200 ${
                  selectedItem === "Supers" ? "bg-gray-200" : ""
                }`}
                to="/supers"
                onClick={() => handleItemClick("Supers")}
              >
                <Grid size={20} />
                <span>Supers</span>
              </Link>
            </li> */}
            <li>
              <Link
                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-200 ${
                  selectedItem === "Users" ? "bg-gray-200" : ""
                }`}
                to="/participants"
                onClick={() => handleItemClick("Users")}
              >
                <Users size={20} />
                <span>Participants</span>
              </Link>
            </li>

          </ul>
        </nav>
        <div className="p-4 border-t">
          <button
            className="flex items-center w-full space-x-2 p-2 rounded hover:bg-gray-200"
            onClick={() => console.log("Settings clicked")}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="sticky top-0 bg-white border-b shadow p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex space-x-4">
            <button className="p-2 rounded hover:bg-gray-200">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </button>
            <button className="p-2 rounded hover:bg-gray-200">
              <Users className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4">
          <Outlet /> {/* Render nested routes */}
        </div>
        
        
      </main>
    </div>
  );
}
