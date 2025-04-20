import React from "react";
import { socialIcons, menuItems } from "../../../../text/footerText/footerText";
import { BsTwitterX } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { ImLinkedin } from "react-icons/im";
import { FaApple } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import { useState } from "react";
import SignUpModal from "../../../modals/navbar_modal/SignUpModal";
const Footer = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<footer className="bg-white">
				<div className="mx-auto py-14">
					{/* Review Card - New Section */}
					<div className="flex w-full justify-center px-4 lg:px-20 mb-12  ">
						<div className="bg-gradient-to-r from-teal-500 to-purple-700 rounded-lg  sm:px-16  md:px-28 py-12 text-center  flex flex-col justify-center items-center ">
							<h2 className="text-3xl font-bold text-white mb-2">
								Want to Help Others?
							</h2>
							<h3 className="text-2xl font-bold text-white mb-4">
								Write a Review!
							</h3>
							<p className="text-white mb-2">
								Every review you write helps clarify choices for everyone.
							</p>
							<p className="text-white mb-2">
								Sign in or sign up to share your software experiences and
								insights.
							</p>
							<p className="text-white mb-6">Let's rise by lifting others!</p>
							<button
								className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold"
								onClick={() => setIsOpen(true)}
							>
								Sign Up / Sign In
							</button>
						</div>
					</div>

					{/* Menu sections */}
					<div className="grid grid-cols-1 md:grid-cols-10 mx-2 mb-12 md:mx-20  ">
						{/* Top section with logo and address */}
						<div className="col-span-1 md:col-span-4 flex flex-col items-center mb-8 md:mb-0">
							<div className="mb-4 flex flex-col justify-center md:justify-start">
								<div className="mb-4">
									<img
										src="/SoftwareCoverage.png"
										alt="Tekpon"
										className="h-12"
									/>
								</div>

								<address className="not-italic text-gray-600 md:text-left">
									<p className="mb-1">651 N Broad St., Suite 206</p>
									<p className="mb-1">Middletown, 19709</p>
									<p>DE, United States</p>
								</address>
							</div>
						</div>

						{/* Menu Items */}
						<div className="col-span-1 md:col-span-6 flex flex-wrap md:flex-nowrap justify-between">
							{Object.entries(menuItems).map(([title, items]) => (
								<div
									key={title}
									className="w-1/2 md:w-auto text-left mb-6 md:mb-0"
								>
									<h3 className="font-bold text-lg mb-4">{title}</h3>
									<ul className="space-y-1">
										{items.map((item) => (
											<li key={item}>
												<a
													href="#"
													className="text-gray-600 hover:text-gray-900"
												>
													{item}
												</a>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>

					{/* Bottom section */}
					<div className="flex flex-col md:flex-row justify-around items-center pt-8">
						<p className="w-[60%] text-gray-600 mb-4 md:mb-0 text-sm text-center">
							© 2020 - 2024 Software Coverage | All rights reserved
						</p>
						<div className=" px-4 md:px-0 flex space-x-6 w-full md:w-[40%] justify-center md:justify-start">
							<BsTwitterX className="w-6 h-6 text-gray-600" />
							<ImLinkedin className="w-6 h-6 text-gray-600" />
							<ImFacebook2 className="w-6 h-6 text-gray-600" />
							<FaYoutube className="w-6 h-6 text-gray-600" />
							<FaTiktok className="w-6 h-6 text-gray-600" />
							<FaSpotify className="w-6 h-6 text-gray-600" />
							<FaApple className="w-6 h-6 text-gray-600" />
						</div>
					</div>
				</div>
			</footer>
			<SignUpModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	);
};

export default Footer;
