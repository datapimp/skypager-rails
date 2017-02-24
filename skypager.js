export default (project) => {
  project.compilers.add(project.select('require-context', {
    origin: 'src/compilers/index.js',
    pattern: '*/compilers/:name.js',
    base: 'src',
  }))

  project.servers.add(project.select('require-context', {
    origin: 'src/servers/index.js',
    pattern: '*/servers/:name.js',
    base: 'src',
  }))
}
