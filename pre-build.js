const fetch = require('node-fetch');
const fs = require('fs');

fetch(`https://graphql.datocms.com`, {
  method: 'POST',
  headers: new Map([['Content-Type', 'application/json' ], ['Authorization', 'Bearer 0b482a73237f18208776f72970b146']]),
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
    console.log('Results ... ', result);
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