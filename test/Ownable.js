'use strict';

const assertRevert = require('./helpers/assertRevert');

var Ownable = artifacts.require('./Ownable.sol');

contract('Ownable', function(accounts) {
  let ownable;

  // В каждом блоке describe можно также задать функции before/after, которые будут 
  // выполнены до/после запуска тестов, а также beforeEach/afterEach, которые выполняются до/после каждого it.

  beforeEach(async function() {
    ownable = await Ownable.new();
  });

  it('should have an owner', async function() {
    let owner = await ownable.owner();
    assert.isTrue(owner !== 0);// is True Asserts that value is true.
  });

  it('changes owner after transfer', async function() {
    let other = accounts[1];
    await ownable.transferOwnership(other);
    let owner = await ownable.owner();

    assert.isTrue(owner === other);
  });

  it('should prevent non-owners from transfering', async function() {
    const other = accounts[2];
    const owner = await ownable.owner.call();
    assert.isTrue(owner !== other);
    try {
      await ownable.transferOwnership(other, {from: other});
      assert.fail('should have thrown before');// assert.fail() - Throw a failure.
    } catch(error) {
      assertRevert(error);
    }
  });

  it('should guard ownership against stuck state', async function() {
    let originalOwner = await ownable.owner();

    try {
      await ownable.transferOwnership(null, {from: originalOwner});
      assert.fail();
    } 

    catch(error) {
      assertRevert(error);
    }
  });

});
