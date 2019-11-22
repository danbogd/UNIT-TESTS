const assertRevert = require('./helpers/assertRevert');

var BasicTokenMock = artifacts.require("./helpers/BasicTokenMock.sol");

contract('BasicToken', function(accounts) {

  it("should return the correct totalSupply after construction", async function() {
    let token = await BasicTokenMock.new(accounts[0], 100);
    let totalSupply = await token.totalSupply();

    assert.equal(totalSupply, 100);
  })

  it("should return correct balances after transfer", async function(){
    let token = await BasicTokenMock.new(accounts[0], 100); // устанавливаем баланс пользователя
    let transfer = await token.transfer(accounts[1], 100); // запускаем тестируемый метод (function transfer(address _to, uint256 _value) public returns (bool) {})

    let firstAccountBalance = await token.balanceOf(accounts[0]);
    assert.equal(firstAccountBalance, 0);

    let secondAccountBalance = await token.balanceOf(accounts[1]);
    assert.equal(secondAccountBalance, 100);
  });


  it('should throw an error when trying to transfer more than balance', async function() { // проверка require 
    let token = await BasicTokenMock.new(accounts[0], 100);
    try {
      let transfer = await token.transfer(accounts[1], 101); //101
      assert.fail('should have thrown before');  
    } catch(error) {
      assertRevert(error);
    }
  });

  it('should throw an error when trying to transfer to 0x0', async function() {
    let token = await BasicTokenMock.new(accounts[0], 100);
    try {
      
      let transfer = await token.transfer(0x0, 100);
      assert.fail('should have thrown before');
    } catch(error) {
      assertRevert(error);
    }
  }); //конец it

  it('should emit Transfer event', async () => {
    
    let amount = 10; // 10 токенов
    let token = await BasicTokenMock.new(accounts[0], 100);  
    let result = await token.transfer(accounts[2], amount);
    
    assert.equal(result.logs.length, 1);
    assert.equal(result.logs[0].event, 'Transfer');
    assert.equal(result.logs[0].args.to, accounts[2]);// сравнение result.logs[0].args.to (здесь to, а не _to) с _to
    assert.equal(result.logs[0].args.value.valueOf(), amount); // числовое сравнение  result.logs[0].args.value.valueOf()(здесь value, а не _value) с amount
   

});   

});
