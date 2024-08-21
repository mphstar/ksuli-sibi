import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  name: string;
  isActive: boolean;
};

const NavLink = ({ href, name, isActive }: NavLinkProps) => {
  return (
    <a href={href}>
      <li
        className={cn(
          "btn bg-transparent border-none",
          isActive ? "text-primary" : ""
        )}
      >
        {name}
      </li>
    </a>
  );
};

export default NavLink;
