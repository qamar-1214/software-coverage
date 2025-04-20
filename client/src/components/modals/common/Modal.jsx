import React from "react";

// Base Modal Component
const Modal = ({ isOpen, setIsOpen, children, containerClass = "" }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-sm bg-white/30 z-50">
			<div
				className={`bg-white/90 rounded-lg shadow-xl w-full max-w-md p-6 relative ${containerClass}`}
			>
				<button
					onClick={() => setIsOpen(false)}
					className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
				>
					× Close
				</button>
				{children}
			</div>
		</div>
	);
};

// Auth Content Component
const AuthContent = () => (
	<div className="flex flex-col items-center space-y-6">
		<img
			src="/SoftwareCoverage.png"
			alt="SoftwareCoverage"
			className="h-26 mb-4"
		/>
		<div className="w-[240px] mx-auto space-y-8">
			{/* Your existing buttons */}
		</div>
	</div>
);

// Example usage:
const SignUpModal = ({ isOpen, setIsOpen }) => (
	<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
		<AuthContent />
	</Modal>
);

export { Modal, AuthContent, SignUpModal };
