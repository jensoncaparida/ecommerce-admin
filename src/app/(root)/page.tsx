import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main>
      Home Page
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
