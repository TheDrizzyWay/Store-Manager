import bcrypt from 'bcryptjs';

export const hashPassword = password => bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt).then(hash => hash));

export const comparePassword = (rawPassword, hash) => bcrypt.compareSync(rawPassword, hash);

export const validateEmail = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
// regex string sourced from Javascript 2.0 by Thomas Powell and Fritz Schneider

export const passwordLength = password => password.length >= 6;

export const validateUrl = imgUrl => (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g).test(imgUrl);
// regex string sourced from Rahul Mahadik on stackoverflow