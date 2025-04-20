import React from "react";

const Awards = () => {
	return (
		<div className="mb-14">
			<div className="relative color-custom-gradient py-16 px-4 min-h-[600px] flex flex-col items-center justify-center text-white text-center">
				{/* Decorative Laurels */}
				<div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
					<div className="relative">
						{/* Left Laurel */}
						<img
							src="https://media.tekpon.com/design/laurels.svg"
							alt=""
							className="absolute left-4 md:left-8 top-1/4 transform -translate-y-1/2 w-16 md:w-24 lg:w-32 opacity-50"
						/>
						{/* Right Laurel */}
						<img
							src="https://media.tekpon.com/design/laurels.svg"
							alt=""
							className="absolute scale-x-[-1] right-4 md:right-8 top-1/4 transform -translate-y-1/2 w-16 md:w-24 lg:w-32 opacity-20"
						/>
					</div>
				</div>

				{/* Main Content */}
				<div className="relative z-10 max-w-4xl mx-auto">
					{/* Title and Year */}
					<div className="mb-8">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
							Software Coverage
						</h1>
						<div className="inline-block bg-orange-300 px-6 py-2 rounded-lg">
							<span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
								2025
							</span>
						</div>
					</div>

					{/* Subtitle */}
					<p className="text-lg md:text-xl lg:text-2xl mb-16 max-w-2xl mx-auto">
						The most awaited event where SaaS leaders shine and connect.
					</p>

					{/* Features Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						<div className="flex flex-col items-center">
							<h3 className="text-2xl md:text-3xl font-bold mb-2">
								1,000 SaaS
							</h3>
							<p className="text-xl md:text-2xl">Executives</p>
						</div>
						<div className="flex flex-col items-center">
							<h3 className="text-2xl md:text-3xl font-bold mb-2">
								No Content,
							</h3>
							<p className="text-xl md:text-2xl">Only Networking</p>
						</div>
						<div className="flex flex-col items-center">
							<h3 className="text-2xl md:text-3xl font-bold mb-2">
								The Only Gala
							</h3>
							<p className="text-xl md:text-2xl">for SaaS Industry</p>
						</div>
					</div>

					{/* CTA Button */}
					<button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg md:text-xl font-semibold hover:bg-blue-50 transition-colors">
						See the 2024 Experience
					</button>
				</div>
			</div>
		</div>
	);
};

export default Awards;
