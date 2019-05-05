#! node
var fs = require('fs');
var path = require('path');

function copyTemplate(from, to) {
  from = path.join(__dirname, 'templates', from);
  write(to, fs.readFileSync(from, 'utf-8'));
  process.stdout.write('build over.please cd zyc-cli to scan your project')
}
function write(path, str, mode) {
  fs.writeFileSync(path, str);
}
function mkdir(path, fn) {
  fs.mkdir(path, function(err) {
    fn && fn();
  });
}
function readPackage() {
  var package = fs.readFileSync(path.join(__dirname, './package.json'));
  if (package) {
    return JSON.parse(package);
  }
}
var argv = process.argv[2];
switch (argv) {
  case '-v':
  case '--version':
    process.stdout.write(readPackage().version);
    break;
  case '-h':
  case '--help':
    process.stdout.write('please run "zyc-cli create" to build your project');
    break;
  case 'create':
    mkdir(path.join(process.cwd(), readPackage().name), () => {
      copyTemplate('./demo.html', path.join(process.cwd(), readPackage().name,'./index.html'));
    });
    break;
}
readPackage();
