pragma solidity ^0.4.18;


import '../../contracts/BasicToken.sol';// каталог контрактов вызываемый из helpers


// mock class using BasicToken
contract BasicTokenMock is BasicToken {

  function BasicTokenMock(address initialAccount, uint256 initialBalance) public {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}
