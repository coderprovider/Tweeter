import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="AppHeader w-full bg-white">
      <Navbar fluid={true} className="mx-auto w-[90rem]">
        <Navbar.Brand href="https://flowbite.com/">
          <img
            src="/images/tweeter.svg"
            className="h-6 sm:h-9"
            alt="app Logo"
          />
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link href="/profile">Profile</Link>
            </Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Link href="/" legacyBehavior>
            <Navbar.Link active={true} className="cursor-pointer">
              Home
            </Navbar.Link>
          </Link>
          <Link href="/explore" legacyBehavior>
            <Navbar.Link className="cursor-pointer">Explore</Navbar.Link>
          </Link>
          <Link href="/bookmarks" legacyBehavior>
            <Navbar.Link className="cursor-pointer">Bookmarks</Navbar.Link>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
