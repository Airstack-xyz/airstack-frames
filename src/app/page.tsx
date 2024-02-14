import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Airstack Frames</h1>
      <ul className="text-2xl">
        <li>
          <Link href="/og" className="underline">
            Farcaster OG
          </Link>
        </li>
      </ul>
    </div>
  );
}
