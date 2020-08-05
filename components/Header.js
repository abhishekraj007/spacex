import Link from "next/link";

export default function Header({ onClick }) {
  return (
    <header className="header">
      <Link href="/" as="/">
        <a>SpaceX Lanuch Programs</a>
      </Link>
    </header>
  );
}
