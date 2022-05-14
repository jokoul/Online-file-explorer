console.log(Math.log10(1000)); //return 3 because 10^3=1000

const filesize = 10000; //bytes
//managing units
const units = "BKMGT";

const index = Math.floor(Math.log10(filesize) / 3);

//700->700/1000^0
//10000->10000/1000^1
//10000000->10000/1000^2
const filesizeHuman = filesize / Math.pow(1000, index);

console.log(`${filesizeHuman}${units[index]}`);
