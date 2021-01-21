// https://nextjs.org/docs/advanced-features/custom-document
export default function Custom404() {
  return (
    <>
      <div className="container">
        <div>
          <h1>404</h1>
          <div className="message">
            <h2>This page could not be found</h2>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          color: #000;
          background: #fff;
          font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI',
            'Fira Sans', Avenir, 'Helvetica Neue', 'Lucida Grande', sans-serif;
          height: 100vh;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        h1 {
          display: inline-block;
          border-right: 1px solid rgba(0, 0, 0, 0.3);
          margin: 0;
          margin-right: 20px;
          padding: 10px 23px 10px 0;
          font-size: 24px;
          font-weight: 500;
          vertical-align: top;
        }

        .message {
          display: inline-block;
          text-align: left;
          line-height: 49px;
          height: 49px;
          vertical-align: middle;
        }

        h2 {
          font-size: 14px;
          font-weight: normal;
          line-height: inherit;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
}
