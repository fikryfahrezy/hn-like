const fetch = require('node-fetch');
const fs = require('fs');

function githubSeed() {
  // https://docs.github.com/en/rest
  const json = {
    data: [],
  };
  fetch('https://api.github.com/users/fikryfahrezy/starred?per_page=100')
    .then((res) => res.json())
    .then((dt) => {
      dt.forEach((val) => {
        json.data.push({
          title: val.name,
          link: val.clone_url,
        });
      });

      // https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js
      // fs.writeFileSync('/base-seed/awesome.json', JSON.stringify(json));
    })
    .catch((e) => console.log(e));
}

function reSeed(relation) {
  function fetcher(route) {
    fetch(`http://localhost:1337/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5MDE4MDI0LCJleHAiOjE2MDE2MTAwMjR9._vFGhU0UFdZ1RHApp7oH-49dh3Ucpti3leS85672Rrc',
      },
    })
      .then((res) => res.json())
      .then((dt) => {
        const json = [];
        if (route === 'jsids') {
          dt.forEach((val) => {
            json.push({
              id: val.id,
              title: val.title,
              link: val.link,
              page: val.page,
              slug: val.slug,
              description: val.description,
              category: val.jsid_category.name,
              categoryId: val.jsid_category.id,
              source: val.jsid_source.name,
              sourceId: val.jsid_source.id,
            });
          });
        } else if (route.includes('sources') || route.includes('categories')) {
          dt.forEach((val) => {
            json.push({
              id: val.id,
              name: val.name,
            });
          });
        } else if (route === 'accesses') {
          dt.forEach((val) => {
            json.push({
              id: val.id,
              name: val.name,
            });
          });
        } else if (route.includes('articles')) {
          dt.forEach((val) => {
            json.push({
              id: val.id,
              title: val.title,
              link: val.link,
              page: val.page,
              slug: val.slug,
              categoryId: val.article_category.id,
              category: val.article_category.name,
              sourceId: val.article_source.id,
              source: val.article_source.name,
              accessId: val.article_access.id,
              access: val.article_access.name,
            });
          });
        } else {
          dt.forEach((val) => {
            // https://stackoverflow.com/questions/952924/javascript-chop-slice-trim-off-last-character-in-string
            const name =
              route.substr(route.length - 1) === 's'
                ? route.slice(0, -1)
                : route;
            json.push({
              id: val.id,
              title: val.title,
              link: val.link,
              page: val.page,
              slug: val.slug,
              categoryId: val[`${name}_category`].id,
              category: val[`${name}_category`].name,
              sourceId: val[`${name}_source`].id,
              source: val[`${name}_source`].name,
            });
          });
        }

        // https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js
        // fs.writeFileSync(
        //   `${__dirname}/re-seed/${route}.json`,
        //   JSON.stringify(json)
        // );
      })
      .catch((e) => console.log(e));
  }

  if (relation === 'foreign') {
    // fetcher('accesses');
    // fetcher('article-categories');
    // fetcher('article-sources');
    // fetcher('devto-categories');
    // fetcher('jsid-categories');
    // fetcher('jsid-sources');
    // fetcher('medium-categories');
    // fetcher('personal-categories');
    // fetcher('repository-categories');
    // fetcher('tech-categories');
  } else if (relation === 'parent') {
    // fetcher('techs');
    // fetcher('articles');
    // fetcher('devtos');
    // fetcher('jsids');
    // fetcher('mediums');
    // fetcher('personals');
    // fetcher('repositories');
  }
}

function baseSeed(relation) {
  let access;
  if (relation === 'parent') {
    access = JSON
      .parse
      // fs.readFileSync(`${__dirname}/re-seed/accesses.json`, 'utf-8')
      ();
  }
  function fetcher(route) {
    function fetching(data) {
      fetch(`http://localhost:1337/${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5MDE4MDI0LCJleHAiOjE2MDE2MTAwMjR9._vFGhU0UFdZ1RHApp7oH-49dh3Ucpti3leS85672Rrc',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((dt) => {
          console.log('success');
        })
        .catch((e) => console.log(e));
    }

    let objRel,
      rel,
      name = route;
    if (relation === 'parent') {
      if (route.substr(route.length - 3) === 'ies') {
        name = `${route.slice(0, -3)}y`;
      } else if (route.substr(route.length - 2) === 'es') {
        name = route.slice(0, -2);
      }
      name = name.substr(name.length - 1) === 's' ? name.slice(0, -1) : name;
      rel = fs
        .readdirSync(`${__dirname}/re-seed`)
        .filter((file) => file.includes(name));
      objRel = rel.map((file) => ({
        name: file,
        data: JSON
          .parse
          // fs.readFileSync(`${__dirname}/re-seed/${file}`, 'utf-8')
          (),
      }));
    }

    const data = JSON
      .parse
      // fs.readFileSync(`${__dirname}/base-seed/${route}.json`, 'utf-8')
      ();

    data.data.forEach(async (valData) => {
      let categoryId, sourcesId, accessId;
      if (relation === 'parent') {
        objRel.forEach((obj) => {
          if (obj.name.includes('categories')) {
            obj.data.forEach((val) => {
              if (val.name === valData.category) categoryId = val.id;
            });
          } else if (obj.name.includes('sources')) {
            obj.data.forEach((val) => {
              if (val.name === valData.source) sourcesId = val.id;
            });
          }
        });
        access.forEach((obj) => {
          if (obj.name === valData.access) accessId = obj.id;
        });
        if (valData.category) valData.category = `${categoryId}`;
        if (valData.source) valData.source = `${sourcesId}`;
        if (valData.access) valData.access = `${accessId}`;
      }
      // console.log(valData);
      await fetching(valData);
    });
  }

  if (relation === 'foreign') {
    // fetcher('accesses');
    // fetcher('article-categories');
    // fetcher('article-sources');
    // fetcher('devto-categories');
    // fetcher('jsid-categories');
    // fetcher('jsid-sources');
    // fetcher('medium-categories');
    // fetcher('personal-categories');
    // fetcher('repository-categories');
    // fetcher('tech-categories');
  } else if (relation === 'parent') {
    // fetcher('teches');
    // fetcher('articles');
    // fetcher('devtos');
    // fetcher('jsids');
    // fetcher('mediums');
    // fetcher('personals');
    // fetcher('repositories');
  }
}

switch (process.argv[2]) {
  // node seeder baseseed foreign
  // node seeder baseseed parent
  case 'baseseed':
    if (process.argv[3]) {
      // baseSeed(process.argv[3]);
    }
    break;
  // node seeder reseed foreign
  // node seeder reseed parent
  case 'reseed':
    if (process.argv[3]) {
      // reSeed(process.argv[3]);
    }
    break;
  // node seeder githubseed
  case 'githubseed':
    // githubSeed();
    break;
}
