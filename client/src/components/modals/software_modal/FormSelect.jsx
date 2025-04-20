import { memo } from "react";
const FormSelect = memo(({ label, options, loading, ...props }) => (
	<div className="space-y-1">
		<label className="block text-sm font-medium text-gray-700">{label}</label>
		<select
			className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
			{...props}
		>
			<option value="">Select {label}</option>
			{loading ? (
				<option disabled>Loading...</option>
			) : (
				options?.map((option) => (
					<option key={option._id} value={option._id}>
						{option.name}
					</option>
				))
			)}
		</select>
	</div>
));

export default FormSelect;
