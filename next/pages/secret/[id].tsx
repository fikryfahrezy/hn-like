import dynamic from 'next/dynamic';

const Gist = dynamic(() => import('../../components/gist'), {
  ssr: false,
});

const SecretDetail = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Gist />
    </div>
  );
};

export default SecretDetail;
