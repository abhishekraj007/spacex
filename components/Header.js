import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link href="/" as="/">
        <a data-test-id="logo">SpaceX Lanuch Programs</a>
      </Link>
    </header>
  );
}
