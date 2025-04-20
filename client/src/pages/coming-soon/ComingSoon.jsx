import Navbar from "../../components/navigation/User/navbar/Navbar";
import Footer from "../../components/navigation/User/footer/Footer";
const ComingSoon = () => {
	return (
		<>
			<Navbar />
			<div className="w-screen h-screen flex flex-col justify-center items-center space-y-8">
				<h1 className="text-center  text-5xl lg:text-8xl text-teal-600 font-bold">
					Coming Soon
				</h1>
				<p className="text-center   text-xl lg:text-4xl ">
					The page you are looking for is under construction or not available
					yet.
				</p>
			</div>
			<Footer />
		</>
	);
};

export default ComingSoon;
