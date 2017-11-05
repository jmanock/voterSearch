const server = require('server');
const { get } = server.router;
const { render } = server.reply;
const id = '121J0T9n5xpGbaBMDsgvdimYBfzNr31mBH20EaI5zJmQ';
const drive = require('drive-db')(id);
const homeRoute = get('/', async () =>{
  const db = await drive.load();
  console.log(db.find());
  return render('index.hbs', {users:db.find()});
});
server(3000, homeRoute);
