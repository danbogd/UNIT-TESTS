
const MetaCoin = artifacts.require("SafeMath");// название контакта в папке build

module.exports = function(deployer) {
    
deployer.deploy(MetaCoin);
};



