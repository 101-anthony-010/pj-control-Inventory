const os = require('os');

const getLocalIp = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const { address, family, internal } of interfaces[name]) {
      if (family === 'IPv4' &&!internal && address.startsWith('192.168.233.')) {
        return address;
      }
    }
  }
  return null;
};

console.log(getLocalIp());