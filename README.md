# shops_around_me
App provide food recommendation

### frontend

In the `frontend/` folder, run the following command:

``` bash
// install dependencies
npm install

// run at localhost:3000
npm start
```

#### backend

In the `backend/` folder, run the following command:

``` bash
// install dependencies
pip install -r requirements.txt
```

In order to use mongodb as database, fill in the mongodb link into `backend/constants/authoInfo.py`.
For example,
``` python
mongoDB_Auth = "mongodb://YOUR_DB_LINK"
```

#### Solidity

In the `solidity/` folder, run the following command:

``` bash
// deploy the contract to private blockchain
truffle migrate
```

You would get the contract address of the `ShopGenerator`.Copy and paste to the `frontend/utils/constants/contracts/ShopGenerator.js`.Change the address like this one:

``` javascript
var address = "0x647A15530200807945138138e0A2f4654aCAF4FC"
```

Frontend need the deployed address of the contract to produce new Shop contract.

### Deployment

to be Updated


### Authors

**Jeffery(PO-HUI) Hsieh**

### License

This project is licensed under the MIT License


