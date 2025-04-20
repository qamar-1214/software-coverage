import React, { useState, useRef, useEffect } from "react";
import { ArrowUpDown, Check } from "lucide-react";

const AnimatedSortDropdown = ({ sortOrder, setSortOrder }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const options = [
		{ value: "A-Z", label: "A to Z" },
		{ value: "Z-A", label: "Z to A" },
	];

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSelect = (value) => {
		setSortOrder(value);
		setIsOpen(false);
	};

	return (
		<div className="relative flex items-center gap-2 z-10">
			<ArrowUpDown className="h-4 w-4" />
			<span className="text-black font-medium">Sort by</span>
			<div className="relative" ref={dropdownRef}>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="pl-6 pr-1 py-1 border drop-shadow-lg rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-gray-200 bg-white flex items-center justify-between min-w-[160px]"
				>
					{options.find((opt) => opt.value === sortOrder)?.label}
					<svg
						className={`ml-2 h-4 w-4 transition-transform duration-200 ${
							isOpen ? "rotate-180" : ""
						}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>

				{/* Dropdown Menu */}
				<div
					className={`absolute mt-1 w-full bg-white border rounded-lg shadow-lg overflow-hidden transition-all duration-200 origin-top ${
						isOpen
							? "opacity-100 scale-y-100 transform translate-y-0"
							: "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
					}`}
				>
					{options.map((option) => (
						<button
							key={option.value}
							onClick={() => handleSelect(option.value)}
							className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
						>
							<div
								className={`border border-black rounded-full h-3.5 w-3.5 flex items-center justify-center${
									sortOrder === option.value ? "bg-black" : "bg-white"
								}`}
							>
								{sortOrder === option.value && (
									<Check className="h-3.5 w-3.5 text-white " />
								)}
							</div>
							<span className="text-sm">{option.label}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default AnimatedSortDropdown;
