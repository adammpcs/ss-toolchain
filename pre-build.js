const fetch = require('node-fetch');
const fs = require('fs');

fetch(`https://graphql.datocms.com`, {
  method: 'POST',
  headers: new Map([['Content-Type', 'application/json' ], ['Authorization', `Bearer ${process.env.DELIVERY_TOKEN}`]]),
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json(), err => console.error(err))
  .then(result => {
    // Grab URLs for API
    fetch(`https://graphql.datocms.com`, {
      method: 'POST',
      headers: new Map([['Content-Type', 'application/json' ], ['Authorization', `Bearer ${process.env.DELIVERY_TOKEN}`]]),
      body: JSON.stringify({
        variables: {},
        query: `
          {
            allPages {
              slug
            },
            allNews {
              slug
            } 
          }
        `,
      }),
    }).then(result => result.json(), err => console.error(err))
    .then(res2 => {
      if (!res2)
        return;
      // here we're writing our page urls to a json file
      const pageURLS = { data: [...res2.data.allPages.map(p => '/' + p.slug), ...res2.data.allNews.map(n => '/news/' + n.slug)]};
      fs.writeFile('./pageURLS.json', JSON.stringify(pageURLS.data), err => {
        if (err) {
          console.error('Error writing pageURLS file', err);
        } else {
          console.log('Page urls successfully extracted!');
        }

        
        if (!result)
          return;
        // here we're filtering out any type information unrelated to unions or interfaces
        const filteredData = result.data.__schema.types.filter(
          type => type.possibleTypes !== null,
        );
        result.data.__schema.types = filteredData;
        fs.writeFile('./fragmentTypes.json', JSON.stringify(result.data), err => {
          if (err) {
            console.error('Error writing fragmentTypes file', err);
          } else {
            console.log('Fragment types successfully extracted!');
          }
        });
      });
    });
  });
  