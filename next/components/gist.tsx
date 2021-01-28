import { useRouter } from 'next/router';

const Gist = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <iframe
      src={`/api/gist?gist_id=${id}`}
      style={{
        width: '100%',
        height: '100%',
      }}
    ></iframe>
  );
};

export default Gist;
