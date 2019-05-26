var address = "0x647A15530200807945138138e0A2f4654aCAF4FC";

const ABI = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "signature": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_newContract",
          "type": "address"
        }
      ],
      "name": "newShop",
      "type": "event",
      "signature": "0xdaf3ad65fca6081fc1f0ad9f8ea4723cd6931e4876c23d9cfbb27a0c5e2aff9b"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_shopName",
          "type": "string"
        }
      ],
      "name": "createShop",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xe674d1f6"
    }
]

export { ABI, address }
