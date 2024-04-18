const getLocalIp = () => {
  return new Promise((resolve, reject) => {
    const ifaces = navigator.socketTcpConnection.getAllInterfaceAddresses();
    const ipAddresses = ifaces
      .filter((iface) => iface.address.startsWith('192.168.'))
      .map((iface) => iface.address);
    if (ipAddresses.length > 0) {
      resolve(ipAddresses[0]);
    } else {
      reject(new Error('Could not find local IP address'));
    }
  });
};

export default getLocalIp;