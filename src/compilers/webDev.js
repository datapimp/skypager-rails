import mapValues from 'lodash/mapValues'

export const dllName = 'application'

export const dllLibraryName = 'application'

export function configure (options = {}, context = {}) {
  const { project } = context  

  const {
    outputPath = project.paths.public,
    publicPath = project.get('argv.publicPath', '/'),
    dlls = ['application'], 
    dllPath = project.paths.bundles, 
    dllName = 'application', 
    dllLibraryName = 'application',
    entry = {
      'packs/application': [ project.join('app/javascript/packs', 'application.js') ]
    },
    hot = project.argv.hot !== false,
  } = options

  return project
    .compiler('web', { 
      html: false,
      sourcePaths: [ 
        project.resolve('app/components'),
        project.resolve('app/javascript'),
        project.resolve('app/assets/javascripts'),
      ],
      hot: project.argv.hot,
      dllName,
      dllLibraryName,
      publicPath,
      outputPath,
    }).config

    .modules(project.join('app'))
    .modules(project.join('src'))
    .output({ path: outputPath, publicPath })

    .entry({
      'packs/application': project.join('app/javascript/packs', 'application.js')
    }) 

    .when(hot, (c) => c
      .entry({
        'packs/application': [ HMROptions({publicPath}), project.join('app/javascript/packs', 'application.js') ]
      }) 
    )

    .when(!project.argv.generateDll, c => c
      .copy([{
        from: 'node_modules/semantic-ui-css',
        ignore: ['LICENSE.md', 'README.md', 'package.json', 'package.js', 'components', 'themes'],
      }])
    )

    .when(dlls.length > 0 && project.existsSync(dllPath), (c) => dlls
      .filter(dllName => project.existsSync(project.resolve(dllPath, `${dllName}.dll.json`)))
      .reduce((cfg, dllName) => 
        cfg.plugin('webpack.DllReferencePlugin', {
          context: project.cwd,        
          manifest: project.readJsonSync(
            project.resolve(dllPath, `${dllName}.dll.json`)
          )
        }), c)
    )
}

const HMROptions = (options = {}) => {
  const { publicPath } = options
  const webpackHotPath = `${publicPath}__webpack_hmr`

  const webpackHotMiddlewareEntry = {
    path: webpackHotPath,   // The path which the middleware is serving the event stream on
    overlay: true,          // Set to false to disable the DOM-based client-side overlay.
    noInfo: false,          // Set to true to disable informational console logging.
    quiet: false,           // Set to true to disable all console logging.
  }

  return `webpack-hot-middleware/client?${require('querystring').stringify(webpackHotMiddlewareEntry)}`
}
