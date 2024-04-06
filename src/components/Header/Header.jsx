import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Logo, LogOutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    // {
    //   name: "Write",
    //   slug: "/add-post",
    //   active: !authStatus
    // },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-[#9fd49f] h-[8rem] px-8">
      <Container>
        <nav className="flex flex-col md:flex-row gap-4 md:justify-end w-full">
          <div className="mr-4 text-center md:text-start">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex  items-center justify-center md:ml-auto">
            <li key="write" className="inline-block px-6 md:py-2 text-xl duration-200 hover:bg-blue-100 rounded-full "><Link to="/add-post">Write</Link></li>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 md:py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (

              <li>
                <LogOutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
