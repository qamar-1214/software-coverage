import { useState } from "react";

const FAQItem = ({ question, answer }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className={` px-4 py-4 cursor-pointer  rounded-lg ${
				isOpen ? "bg-white shadow-md" : "bg-gray-50"
			}`}
			onClick={() => setIsOpen(!isOpen)}
			aria-expanded={isOpen} // ARIA attribute for accessibility
			role="button"
			tabIndex="0"
			onKeyPress={(e) => e.key === "Enter" && setIsOpen(!isOpen)} // Keyboard interaction
		>
			{/* Question */}
			<div className="flex justify-between items-center">
				<h4 className="text-[18.6988px] font-semibold text-gray-800">
					{question}
				</h4>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className={`h-5 w-5 transform transition-transform duration-300 ${
						isOpen ? "rotate-90 text-blue-600" : "text-gray-600"
					}`}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
					aria-hidden="true"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</div>

			{/* Answer */}
			{isOpen && (
				<div
					className="mt-3  text-gray-700 text-sm md:text-base"
					aria-hidden={!isOpen}
				>
					{answer.split("\n").map((paragraph, index) => (
						<p key={index} className="text-[16.6988px] mb-2 line-clamp-3 ">
							{paragraph}
						</p>
					))}
				</div>
			)}
		</div>
	);
};

export default FAQItem;
