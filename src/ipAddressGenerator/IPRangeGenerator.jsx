// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

function IPRangeGenerator() {
  const [ipAddress, setIPAddress] = useState("");
  const [generatedIPs, setGeneratedIPs] = useState([]);

  const handleIPChange = (event) => {
    setIPAddress(event.target.value);
  };

  const generateIPRange = () => {
    const ipParts = ipAddress.split(".");
    if (ipParts.length === 4) {
      const baseIP = `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.`;
      const generatedIPList = [];
      for (let i = 0; i <= 254; i += 50) {
        generatedIPList.push(`${baseIP}${i}`);
      }
      setGeneratedIPs(generatedIPList);
    } else {
      setGeneratedIPs([]);
    }
  };

  return (
    <div>
      <input type="text" value={ipAddress} onChange={handleIPChange} />
      <button onClick={generateIPRange}>Generate</button>
      <div>
        <p>İlk IP adresi: {`${ipAddress.split(".")[0]}.${ipAddress.split(".")[1]}.${ipAddress.split(".")[2]}.1`}</p>
        <p>Son IP adresi: {`${ipAddress.split(".")[0]}.${ipAddress.split(".")[1]}.${ipAddress.split(".")[2]}.254`}</p>
        <p>Aradaki IP adresleri:</p>
        <ul>
          {generatedIPs.map((ip, index) => (
            <li key={index}>{ip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IPRangeGenerator;
