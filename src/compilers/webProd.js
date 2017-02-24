export function configure (options = {}, context = {}) {
  const { project } = context  

  return project
    .compiler('web', { html: false }).config
    .modules(project.join('app'))
    .modules(project.join('src'))
    .entry({
      'packs/application': project.join('app', 'packs', 'application.js'),
    })
    .copy([{
      from: 'node_modules/semantic-ui-css',
      ignore: ['LICENSE.md', 'README.md', 'package.json', 'package.js', 'components', 'themes'],
    }])
}