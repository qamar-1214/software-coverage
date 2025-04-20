import FAQItem from "../common/FAQItem";
import { faqs } from "../../text/homePageText/homeText";

const FAQ = () => {
	return (
		<section className="py-16 px-4 md:px-12 lg:px-24 bg-gray-50">
			<div className="grid grid-cols-1 md:grid-cols-4 ">
				{/* Title */}
				<div className=" col-span-1 ">
					<h3 className=" sticky top-16 text-[34.2057px] text-balance font-semibold text-gray-800 text-left  md:px-4">
						Frequently Asked Questions
					</h3>
				</div>

				{/* FAQ List */}
				<div className="space-y-4 col-span-3">
					{faqs.map((faq, index) => (
						<FAQItem key={index} question={faq.question} answer={faq.answer} />
					))}
				</div>
			</div>
		</section>
	);
};

export default FAQ;
