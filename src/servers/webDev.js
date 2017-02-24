export function compilerWillMount(webpackConfig) {
  const { project } = this
  const { entry } = webpackConfig

  return webpackConfig
}

export function create(options = {}, context = {}) {
  const { project = this.project || this } = context

  const compiler = project
    .compiler('webDev', {
      publicPath: 'http://localhost:3001/',
      hot: true,
      ...project.argv,
    })

  const dev = project.servers.lookup('development').create

  return dev.call(this, { ...options, compiler }, { ...this.context, ...context})
}