import React from "react";
import AnimatedText from "./AnimatedText";
import SearchBar from "./SearchBarBanner";

const Banner = () => {
	return (
		<section className="bg-gradient-to-br from-white to-blue-50 h-[98vh] sm:min-h-screen -mt-12 flex flex-col justify-center items-center px-4 text-center leading-none">
			<div className="mb-4 self-center">
				<img
					src="/SoftwareCoverage.png"
					alt="SoftwareCoverage"
					className="h-30 lg:h-40"
				/>
			</div>

			<h1 className="text-[35px] sm:text-[35px] lg:text-[45px] font-semibold text-[#211F20] text-center leading-tight tracking-normal">
				<span className="inline-block">Find the right software</span>
				<AnimatedText />
				<br />
				for your business
			</h1>

			<div className="leading-tight text-[25px] font-normal sm:text-[26px] mt-2 lg:text-[26px] text-[#211F20] flex lg:flex-row flex-col tracking-normal">
				<div>
					<p className="">
						Choose your software based on data summarized from{" "}
					</p>
				</div>
				<div>
					<span className="text-custom-gradient font-medium pl-2">
						230,807,871
					</span>{" "}
					<span className="font-medium">reviews</span>
				</div>
			</div>

			<div className="mt-10 w-full max-w-4xl">
				<SearchBar />
			</div>
		</section>
	);
};

export default Banner;
