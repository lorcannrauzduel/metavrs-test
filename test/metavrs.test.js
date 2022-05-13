const { 
  deployProxy, 
  upgradeProxy 
} = require('@openzeppelin/truffle-upgrades');

const {
  BN,
  expectEvent, 
  expectRevert
} = require('@openzeppelin/test-helpers');

const Metavrs = artifacts.require('Metavrs');
const MetavrsV2 = artifacts.require('MetavrsV2');

describe('Metavrs Test', () => {
  let accounts, owner, alice, bob, airdropSecretKey;

  before(async function () {
    this.timeout(10000);

    accounts = await web3.eth.getAccounts();
    owner = accounts[0];
    alice = accounts[1];
    // bob = accounts[2];
    airdropSecretKey = "567844687866";

    this.metavrs = await deployProxy(Metavrs, [(10000000000000000).toString(), "0xe18049442654a358a6c24cd6a5163f5af4252af78ddfe24186d12951f3daa871"]);
  })

  it('should not give airdrop if sender not used any secret key', async function() {
    (await expectRevert(this.metavrs.airdrop(alice, 00000, [], []), 'Unauthorized'));
  });

  it('should give airdrop if sender used the good secret key', async function() {
    const receipt = await this.metavrs.airdrop(alice, airdropSecretKey, [], []);
    expectEvent(receipt, "Transfer", { to: alice, tokenId: new BN(0) });
  });

  it('should works after upgrading', async function () {
    this.timeout(10000);
    const newInstance = await upgradeProxy(this.metavrs.address, MetavrsV2);
    assert.equal(await newInstance.version(), 2);
  });

});