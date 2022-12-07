import got from 'got'
import _ from 'lodash';

function parse(inputArray) {
  return new Promise(async (resolve, reject) => {
    try {
      // @TODO
      // 1. retrieve list from https://api.fliplet.com/v1/widgets/assets
      // 		note: you may need to use a CORS proxy
      // 2. parse the inputArray into a list of assets using the above list

      let res = await got.get('https://api.fliplet.com/v1/widgets/assets');
      const parsedBody = JSON.parse(res.body)
      const assets = parsedBody.assets
      let filteredAsset = _.pick(assets, inputArray);
      const map = new Map(Object.entries(filteredAsset));
      let assetList = [];

      for (let [key, value] of map) {
        let dependencies;
        if (value.dependencies) {
          dependencies = value.dependencies;
          dependencies = dependencies.sort();
          if (value.category === 'first-party') {
            const versionKeys = Object.keys(value.versions);
            assetList.push(...value.versions[versionKeys[0]])
          } else {
            for (let i = 0; i < dependencies.length; i++) {
              const depAsset = assets[dependencies[i]];
              const versionKeys = Object.keys(depAsset.versions);
              if (_.size(depAsset.dependencies) > 0 || depAsset.category === 'vendor') {
                assetList.push(...depAsset.versions[versionKeys[0]])
              }
            }
          }

        } else {
          const versionKeys = Object.keys(value.versions);
          assetList.push(...value.versions[versionKeys[0]])
        }
      }
      return resolve([...new Set(assetList)]);
    } catch (err) {
      return reject(err);
    }
  })
}

parse(['bootstrap', 'fliplet-core', 'moment', 'jquery']).then(function (assets) {
   /*
   
   assets is expected to be an array with the
   following values in the same order as here:
   
   [
   	 "fonts/glyphicons-halflings-regular.ttf",
		 "fonts/glyphicons-halflings-regular.woff",
		 "fonts/glyphicons-halflings-regular.woff2",
     'bootstrap-css.bundle.css',
     'bootstrap-js.bundle.js',
     'jquery.js',
   	 'fliplet-core.bundle.css',
		 'fliplet-core.bundle.js',
     'moment.min.js'
   ]
   
   */
  console.log('The list is', assets);
});