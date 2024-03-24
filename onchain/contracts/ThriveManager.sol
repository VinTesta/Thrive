// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;

import "./Thrive.sol";
import "hardhat/console.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ThriveManager {
  Thrive private _thriveToken;
  AggregatorV3Interface internal dataFeed;
  uint256 public tokenPrice = 5000; 

  event BuyTokens(address indexed buyer, uint256 amount);

  constructor() {
      _thriveToken = new Thrive();
      
      dataFeed = AggregatorV3Interface(
        0x694AA1769357215DE4FAC081bf1f309aDC325306
      );
  }

  function setDataFeed(address dataFeedAddress) public  {
    dataFeed = AggregatorV3Interface(
      dataFeedAddress
    );
  }

  receive() external payable {
    uint256 amount = tokenAmount(msg.value);
    console.log("Amount: %s", amount);
    _thriveToken.mint(msg.sender, amount);
    emit BuyTokens(msg.sender, amount);
  }

  function tokenAmount(uint256 amountETH) public view returns (uint256) {
    //Sent amountETH, how many usd I have
    uint256 ethUsd = uint256(getChainlinkDataFeedLatestAnswer());
    uint256 amountUSD = amountETH * ethUsd / 10**18; 
    uint256 amountToken = amountUSD / tokenPrice / 10**(8/2);
    console.log(amountETH);
    return amountToken;
  } 

  function getChainlinkDataFeedLatestAnswer() public view returns (uint) {
    (
      uint80 roundID,
      int answer,
      uint startedAt,
      uint timeStamp,
      uint80 answeredInRound
    ) = dataFeed.latestRoundData(); 
    return uint(answer);
  }

  function getThriveToken() public view returns (address) {
      return address(_thriveToken);
  }
}
