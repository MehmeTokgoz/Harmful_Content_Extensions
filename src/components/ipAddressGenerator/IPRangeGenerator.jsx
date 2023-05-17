// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./IPRangeGenerator.scss";

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
    <div className="IP-table-container">
      <input
        className="ip-input-box"
        type="text"
        value={ipAddress}
        onChange={handleIPChange}
      />
      <button className="ip-generate-button" onClick={generateIPRange}>
        Generate
      </button>
      <div className="generate-result-container">
        <table className="table-container">
          <thead>
            <tr>
              <th>İlk IP adresi</th>
              <th>Son IP adresi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{`${ipAddress.split(".")[0]}.${ipAddress.split(".")[1]}.${
                ipAddress.split(".")[2]
              }.1`}</td>
              <td>{`${ipAddress.split(".")[0]}.${ipAddress.split(".")[1]}.${
                ipAddress.split(".")[2]
              }.254`}</td>
            </tr>
          </tbody>
        </table>
        <p className="between-ips">Aradaki IP adresleri:</p>
        <ul className="list-container">
          {generatedIPs.map((ip, index) => (
            <li className="list-items" key={index}>
              {ip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IPRangeGenerator;
