import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ThriveManagerModule = buildModule("ThriveManagerModule", (m) => {

  const thriveManager = m.contract("ThriveManager");

  return { thriveManager };
});

export default ThriveManagerModule;
