const { ethers } = require("hardhat");

async function main() {
  const chainBattlesContract = await ethers.getContractFactory("ChainBattles");
  const chainBattles = await chainBattlesContract.deploy();

  await chainBattles.deployed();
  console.log("ChainBattles deployed at:", chainBattles.address);

  console.log("Minting...");
  const mintTx = await chainBattles.mint();
  await mintTx.wait(1);

  const level = await chainBattles.getLevels(1);
  console.log("Level:", level);

  const tokenURI = await chainBattles.getTokenURI(1);
  console.log("Token URI:", tokenURI);

  console.log("Training...");
  const trainTx = await chainBattles.train(1);
  await trainTx.wait(1);

  const levelAfterTrain = await chainBattles.getLevels(1);
  console.log("Level:", levelAfterTrain);

  const tokenURIAfterTrain = await chainBattles.getTokenURI(1);
  console.log("Token URI:", tokenURIAfterTrain);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });