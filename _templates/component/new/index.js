const { pascalCase } = require('change-case')
// Not yet supported
const questions = [
  {
    type: 'confirm',
    name: 'usePoliglot',
    message: 'Use poliglot (for translations)?',
  },
]

module.exports = {
  params: ({ args }) => {
    args.Name = pascalCase(args.name)
    console.log(args)
    return args
  },
}
