const server = require('server');
const { get } = server.router;
const { render } = server.reply;
const id = '121J0T9n5xpGbaBMDsgvdimYBfzNr31mBH20EaI5zJmQ';
const drive = require('drive-db')(id);
const homeRoute = get('/', async () =>{
  const db = await drive.load();
  console.log('HelloFriend: ',db.find());
  return render('index.hbs', {users:db.find()});
});

const prom = drive.update(id, 'db.json').then(db =>{
  console.log('updated new copy')
}).catch(err => {
  console.log('There was an error');
});
server(3000, homeRoute);
