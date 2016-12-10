const md5 = require('md5');

const HASH_TEST = /^0{5}/;
const testHash = function(hash) {
  return HASH_TEST.test(hash);
}
const crackPassword = function(roomName) {
  let password = '';

  for(
    let i = 0, hash;
    password.length < 8;
    ++i
  ) {
    hash = md5('' + roomName + i);
    if (testHash(hash)) {
      console.log(`Hit with i = ${i} (hash = ${hash})`);
      password += hash[5];
    }
  }

  return password;
};

const ROOM_NAME = 'reyedfim';
const password = crackPassword(ROOM_NAME);
console.log(`The password for ${ROOM_NAME} is ${password}`);
