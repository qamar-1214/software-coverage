import freshdeskIcon from "/Freshdesk-favicon.webp";
const categories = [
	{ title: "ERP", items: ["SAP", "Oracle", "Microsoft Dynamics"] },
	{ title: "Security", items: ["Antivirus", "Firewalls", "Encryption"] },
	{ title: "Analytics", items: ["Tableau", "Power BI", "Looker"] },
	{ title: "Collaboration & Productivity", items: ["Slack", "Teams", "Asana"] },
	{ title: "Marketing", items: ["HubSpot", "Mailchimp", "Google Ads"] },
	{ title: "Design", items: ["Figma", "Sketch", "Adobe XD"] },
	{ title: "Content Management", items: ["WordPress", "Joomla", "Drupal"] },
	{ title: "Human Resources", items: ["BambooHR", "Gusto", "Zoho"] },
];

const faqs = [
	{
		question: "What is Software Coverage?",
		answer: `Tekpon is a B2B SaaS marketplace that connects businesses with the right software solutions. It features real, unbiased reviews from genuine users, helping companies optimize their software stack efficiently and cost-effectively.\n
Tekpon also aids SaaS tools in gaining visibility and trust.\n
With a user-centric design, it offers a comprehensive overview of software options through user reviews and insights.\n
Additionally, Tekpon hosts exclusive industry events, publishes a SaaS-focused magazine, and runs a popular podcast, enhancing its community and resource offerings.`,
	},
	{
		question: "How to find the best software for your business?",
		answer: `To find the right software for your business using Tekpon, begin by leveraging the platform’s comprehensive search and filter tools to narrow down your options based on specific criteria such as industry, software features, and budget.\n
Explore in-depth reviews from real users to gain honest insights into each tool’s performance and reliability.\n
Utilize Tekpon’s unique AI-summarized Global Buzz feature for a quick overview of what the internet is saying about a tool.\n
Compare your top choices side-by-side to see how they stack up against each other in key areas.\n
For additional insights and updates on the latest in SaaS, consider scrolling through our Insights section or listening to the Tekpon SaaS Podcast.\n
Finally, make an informed decision with confidence, knowing you’re choosing from vetted, reputable software solutions that meet your business needs.`,
	},
	{
		question: "How can Software Coverage help you grow your SaaS?",
		answer: `Tekpon boosts SaaS growth by increasing visibility and trust among potential clients through its platform.\n
By featuring your SaaS tool on Tekpon, you can access a targeted audience of businesses seeking software solutions. Real, unbiased reviews from users can elevate your brand’s credibility, while AI-summarized insights from Global Buzz provide a competitive edge.\n
Participation in Tekpon Awards, insights from “What the SaaS” magazine, and exposure on the Tekpon SaaS Podcast further enhance brand awareness and networking opportunities.`,
	},
];

const popularCategories = [
	{
		icon: freshdeskIcon,
		title: "Freshdesk",
		tekponScore: 9.2,
	},
	{
		icon: freshdeskIcon,
		title: "Freshdesk",
		tekponScore: 9.1,
	},
	{
		icon: freshdeskIcon,
		title: "Freshdesk",
		tekponScore: 9.0,
	},
	{
		icon: freshdeskIcon,
		title: "Freshdesk",
		tekponScore: 6,
	},
	{
		icon: freshdeskIcon,
		title: "Freshdesk",
		tekponScore: 9.2,
	},
	{
		icon: freshdeskIcon,
		title: "Freshdesk",
		tekponScore: 9.1,
	},
];

const categorySidebarItems = [
	"CRM",
	"Field Service Management",
	"Help Desk",
	"Inventory Management",
	"Landing Page",
	"Payroll",
	"Project Management",
	"Subscription Management",
];

const compantTestomonialdata = [
	{
		image: "/avatars/person1.jpeg",
		name: "Stefan Smulders",
		title: "Chief Strategy Officer & Co-Founder @ EXPAND.IO",
		quote:
			"Thanks to Software Coverage, our software has been spotlighted. It's about more than recognition — it's the qualitative feedback and the targeted audience that have made a difference. It feels as though our growth is in sync, a true win-win situation.",
	},
	{
		image: "/avatars/person1.jpeg",
		name: "Michael Kamleitner",
		title: "CEO & Founder @ WALLS.IO",
		quote:
			"78% of B2B software purchases are decided based on recommendations from existing customers! Software Coverage unlocks the buying process with authentic, up-to-date customer reviews and brings Walls.io in front of qualified leads.",
	},
	// Add more objects as needed
];
export {
	categories,
	faqs,
	popularCategories,
	categorySidebarItems,
	compantTestomonialdata,
};
