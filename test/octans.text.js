const {assert} = require('chai');

const Octans = artifacts.require('./Octans');

require('chai').use(require('chai-as-promised')).should();


contract('Octans', (accounts) => {
    let contract;

    before( async () => {
        contract = await Octans.deployed();
    })

    // Hacer tests

    // 1. Testear y probar despliegue y acceso a variables
    describe('deployment', async () => {
        // 1.1 Despliegue correcto
        it('deploy successful', async() => {
            const address = contract.address;
            assert.notEqual(address, '');
            assert.notEqual(address, 'null');
            assert.notEqual(address, undefined);
            assert.notEqual(address, '0x0');
        })

        // 1.2 Acceso a variables
        it('has a name', async () => {
            const name = await contract.name();
            assert.equal(name, 'Octans')
        })
        it('has a symbol', async () => {
            const symbol = await contract.symbol();
            assert.equal(symbol, 'OTAN')
        })
    })

    // 2. Test mint
    describe('minting', async () => {
        // 2.1 Crear un token
        it('create a new token', async () => {
            const result = await contract.mint('https...1');
            const totalSupply = await contract.totalSupply();

            // Todo bien
            assert.equal(totalSupply, 1);
            const event = result.logs[0].args;
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from the contract');
            assert.equal(event.to, accounts[0], 'to is msg.sender');

            // Algo salio mal
            await contract.mint('https...1').should.be.rejected;
        })
    })
    
});