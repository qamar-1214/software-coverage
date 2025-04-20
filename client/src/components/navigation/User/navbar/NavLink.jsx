import { memo } from "react";
import { Link } from "react-router-dom";
const NavLink = memo(({ to, className, children }) => (
	<Link to={to} className={className}>
		{children}
	</Link>
));
export default NavLink;
