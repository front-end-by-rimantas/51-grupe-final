/* eslint-disable react/prop-types */
import { Link, useLocation, } from 'react-router-dom';

export function MenuLink({ href, title }) {
    return (
        <li>
            <Link to={href} className={"nav-link px-2" + (useLocation().pathname === href ? ' link-secondary' : '')}>
                {title}
            </Link>
        </li>
    );
}