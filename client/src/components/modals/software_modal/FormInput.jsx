import FormSelect from "./FormSelect";
import { memo } from "react";
const FormInput = memo(({ label, type = "text", ...props }) => (
	<div className="space-y-1">
		<label className="block text-sm font-medium text-gray-700">{label}</label>
		<input
			type={type}
			className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
			{...props}
		/>
	</div>
));

export default FormInput;
