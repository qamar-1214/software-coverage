import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
	LayoutDashboard,
	Package,
	Blocks,
	Layers,
	FolderOutput,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
	const navLinks = [
		{
			title: "Categories",
			path: "/admin/categories",
			icon: <Blocks size={20} />,
		},
		{
			title: "SubCategories",
			path: "/admin/sub-categories",
			icon: <Layers size={20} />,
		},
		{
			title: "Software",
			path: "/admin/software",
			icon: <FolderOutput size={20} />,
		},
		{
			title: "Software Description",
			path: "/admin/software-description",
			icon: <FolderOutput size={20} />,
		},
	];

	return (
		<>
			<aside
				className={`fixed top-0 left-0 z-40 h-screen bg-white shadow-lg transition-transform duration-300 lg:translate-x-0 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} w-64`}
			>
				{/* Logo Area */}
				<div className="h-16 flex items-center justify-center border-b">
					<img src="/SoftwareCoverage.webp" alt="" />
				</div>

				{/* Navigation Links */}
				<nav className="p-4 space-y-2">
					{navLinks.map((link) => (
						<div key={link.title}>
							<NavLink
								to={link.path}
								className={({ isActive }) =>
									`flex items-center gap-3 p-3 rounded-lg transition-colors ${
										isActive
											? "bg-bgLightGreen text-darkGreen"
											: "text-gray-600 hover:bg-bgLightGreen"
									}`
								}
								onClick={() => {
									if (window.innerWidth < 1024) {
										onClose();
									}
								}}
							>
								{link.icon}
								<span>{link.title}</span>
							</NavLink>
						</div>
					))}
				</nav>
			</aside>

			{/* Overlay for mobile */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
					onClick={onClose}
				/>
			)}
		</>
	);
};

export default Sidebar;
