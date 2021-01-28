import ContentLoader from 'react-content-loader';

const Loading = () => (
  <ContentLoader
    speed={1}
    width={476}
    height={124}
    style={{ maxWidth: '800px', marginTop: '1em' }}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    uniqueKey="my-random-value"
  >
    <rect x="7" y="9" rx="0" ry="0" width="427" height="31" />
    <rect x="8" y="50" rx="0" ry="0" width="71" height="18" />
    <rect x="7" y="78" rx="0" ry="0" width="125" height="17" />
    <rect x="7" y="104" rx="0" ry="0" width="125" height="17" />
  </ContentLoader>
);
export default Loading;
