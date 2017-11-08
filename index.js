const server = require('server');
const { get } = server.router;
const { render } = server.reply;
const id = '121J0T9n5xpGbaBMDsgvdimYBfzNr31mBH20EaI5zJmQ';
const drive = require('drive-db')({
  sheet:id,
  local:'db.json',
  cache:0,
  onload:data => data
});
const homeRoute = get('/', async () =>{
  const db = await drive.load();
  console.log('Updated!!!');
  return render('index.hbs', {users:db.find()});
});

server(3000,homeRoute);
setInterval(server,1500000);

/*
  ~ Week One 11 - 19, 110 - 115
  ~ Week Two 21 - 29, 210 - 216
  ~ Week Three 31 - 39, 310 - 316
  ~ Week Four 41 - 49, 410 - 416
  ~ Week Five 51 - 59, 510 - 514
  ~ Week Six 61 - 69, 610 - 614
  ~ Week Seven 71 - 79, 710 - 715
  ~ Week Eight 81 - 89, 810 - 813
  ~ Week Nine 91 - 99, 910 - 913
  ~ Week Ten 101 - 109, 1010 - 1014
  ~ Week Eleven 111 - 119, 1110 - 1114
  ~ Week Twelve 121 - 129, 1210 - 1216
  ~ Week Thirteen 131 - 139, 1310 - 1316
  ~ Week Fourteen 141 - 149, 1410 - 1416
  ~ Week Fifteen 151 - 159, 1510 - 1516
  ~ Week Sixteen 161 - 169, 1610 - 1616
*/
