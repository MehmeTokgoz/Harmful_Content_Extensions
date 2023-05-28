// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./IPRangeGenerator.scss";

function IPRangeGenerator() {
  const [ipAddress, setIPAddress] = useState("");
  const [generatedIPs, setGeneratedIPs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [initialIP, setInitialIP] = useState("");
  const [finalIP, setFinalIP] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [showIPs, setShowIPs] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showAllIps, setShowAllIps] = useState(false);
  // const [selectedIPRange, setSelectedIPRange] = useState(null);

  const handleIPChange = (event) => {
    setIPAddress(event.target.value);
  };

  const generateIPRange = () => {
    const ipParts = ipAddress.split(".");
    const isInvalidIP = ipParts.some((part) => {
      return (
        !/^\d+$/.test(part) || part.slice(-1).match(/[^\d.]/) || part > 255
      );
    });
    if (isInvalidIP) {
      setErrorMessage(
        "Lütfen geçerli bir IP adresi girin. IP adresi: 0.0.0.0 ila 255.255.255.255 arasında nokta ile ayrılmış biçimde olmalıdır."
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return;
    }

    if (ipParts.length === 4 && ipParts.every((part) => /^\d+$/.test(part))) {
      const baseIP = `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.`;
      const generatedIPList = [];

      for (let i = 50; i <= 254; i += 50) {
        generatedIPList.push(`${baseIP}${i}`);
      }
      setGeneratedIPs(generatedIPList);
      setInitialIP(
        `${ipAddress.split(".")[0]}.${ipAddress.split(".")[1]}.${
          ipAddress.split(".")[2]
        }.1`
      );
      setFinalIP(
        `${ipAddress.split(".")[0]}.${ipAddress.split(".")[1]}.${
          ipAddress.split(".")[2]
        }.254`
      );
      setShowIPs(true);
      setErrorMessage("");
    } else {
      setGeneratedIPs([]);
      setInitialIP("");
      setFinalIP("");
      setShowIPs(false);
    }
  };

  return (
    <div className="IP-table-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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
              <td>{initialIP}</td>
              <td>{finalIP}</td>
            </tr>
          </tbody>
        </table>
        <p className="between-ips">Aradaki IP adresleri: </p>
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
