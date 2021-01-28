import { NextApiRequest, NextApiResponse } from 'next';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { gist_id } = req.query;
  if (!gist_id) return res.send('hi');

  const snippet = `
	<!doctype html>
	<html>
    <head>
    </head>
    <body>
      <script src="https://gist.github.com/fikryfahrezy/${gist_id}.js"></script>
    </body>
	</html>`;
  res.statusCode = 200;
  res.statusMessage = 'success';
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('charset', 'UTF-8');
  res.send(snippet);
};
