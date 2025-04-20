import { useState } from "react";

const TrustedOrganizations = () => {
	const organizations = [
		{
			name: "Google Cloud",
			icon: "/trusted-organizations/GoogleCloud_logo.webp",
		},
		{ name: "bill deal", icon: "/trusted-organizations/Bill-Logo.webp" },
		{ name: "HubSpot", icon: "/trusted-organizations/Deel-logo.webp" },
		{ name: "monday.com", icon: "/trusted-organizations/Monday-logo.webp" },
		{
			name: "pipedrive",
			icon: "/trusted-organizations/Pipedrive-new-Logo.webp",
		},
		{ name: "YOUNIUM", icon: "/trusted-organizations/Younium-Logo.webp" },
	];

	return (
		<div className="my-10 px-2   ">
			{/* Heading */}
			<div className="text-center text-lg text-gray-800 mb-6">
				<p>Trusted by the world’s leading organizations</p>
			</div>

			{/* Organizations */}
			<div className="flex flex-wrap justify-center items-center gap-8   ">
				{organizations.map((org) => (
					<div key={org.name} className="flex flex-col items-center my-2 ">
						<img
							src={org.icon}
							alt={org.name}
							className="h-[22px] w-auto   transition-all duration-300 grayscale hover:grayscale-0 "
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default TrustedOrganizations;
