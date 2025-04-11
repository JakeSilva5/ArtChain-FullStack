import { useRouter } from 'next/router';

export default function NFTDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>NFT #{id}</h1>
      <p>Details and child minting options will appear here.</p>
    </div>
  );
}
