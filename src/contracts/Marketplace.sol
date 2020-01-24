pragma solidity ^0.5.0;

contract Marketplace {

    string public name;
    uint public productCount = 0;
    uint public deployedProductCount = 0;
    //mapping(bytes32 => uint) public productsfromid;
    mapping(uint => DeployedProduct) public deployedproducts;
    //mapping(bytes32 => Product) public products;
    mapping(uint => Product) public products;


    struct Product{
        bytes32 productKey;
        uint id;
        string name;
        string description;
        uint price;
        string mfdate;
        string expdate;
        address payable owner;
        bool isApproved;
        bool purchased;
        address  currentowner;
    }

    struct DeployedProduct{
        bytes32 productKey;
        uint id;
        string name;
        string description;
        string mfdate;
        string expdate;
        address payable owner;
        bool isApproved;
        address approvedby;
        bool purchased;
        address currentowner;
    }

    event ProductCreated(
        bytes32 productKey,
        uint id,
        string name,
        string description,
        uint price,
        string mfdate,
        string expdate,
        address payable owner,
        bool isApproved,
        bool purchased,
        address payable currentowner
    );

     event ProductDeployed(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool isApproved,
        address payable approvedby,
        bool purchased,
        address payable[] intemediary
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool isApproved,
        bool purchased
    );

    event ProductTransferred(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool isApproved,
        bool purchased
    );

    function createProduct(string memory _name, string memory _description, uint _price, string memory _mfdate, string memory _expdate) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount ++;
         //
       
        bytes32 hash = keccak256(abi.encodePacked(msg.sender,productCount));
        products[productCount] = Product(hash, productCount, _name, _description, _price, _mfdate, _expdate, msg.sender, false, false, msg.sender);
        // Create the product
        //products[productCount] = Product(productCount, _name, _price, msg.sender, false, false);
        // Trigger an event
        emit ProductCreated(hash, productCount, _name, _description, _price, _mfdate, _expdate, msg.sender, false, false, msg.sender );
    }

   
    // function purchaseProduct(uint _id) public payable {
    //     // Fetch the product
    //     Product memory _product = products[_id];
    //     // Fetch the owner
    //     address payable _seller = _product.owner;
    //     // Make sure the product has a valid id
    //     require(_product.id > 0 && _product.id <= productCount);
    //     // Require that there is enough Ether in the transaction
    //     require(msg.value >= _product.price);
    //     // Require that the product has been approved and certified by authority
    //     require(!_product.isApproved);
    //     // Require that the product has not been purchased already
    //     require(!_product.purchased);
    //     // Require that the buyer is not the seller
    //     require(_seller != msg.sender);
    //     // Transfer ownership to the buyer
    //     _product.owner = msg.sender;
    //     // Mark as purchased
    //     _product.purchased = true;
    //     // Update the product
    //     products[_id] = _product;
    //     // Pay the seller by sending them Ether
    //     address(_seller).transfer(msg.value);
    //     // Trigger an event
    //     emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true, true);
    // }

    function approveProducts(uint _id) public payable{
        // Fetch the product
        Product storage _product = products[_id];
        products[_id].isApproved = true;

        // Fetch the owner
         address payable _manufacturer = _product.owner;
         // Require that the buyer is not the seller
        require(_manufacturer != msg.sender);
        // //fetch details
        bytes32 productKey = _product.productKey;
        string memory _name = _product.name;
        string memory _description = _product.description;
        //uint _price = _product.price;
        string memory _mfdate = _product.mfdate;
        string memory _expdate = _product.expdate;
        // Get the Approver address
        address payable _approver = msg.sender;
        // Require that the product has not been purchased already
        require(!_product.purchased);
        //increment deployed product count
        deployedProductCount ++;
        // Pay the approver by sending them Ether
        address(_approver).transfer(_product.price/1000);
        deployedproducts[deployedProductCount].productKey = productKey;
        deployedproducts[deployedProductCount].id = deployedProductCount;
        deployedproducts[deployedProductCount].name = _name;
        deployedproducts[deployedProductCount].description = _description;
        deployedproducts[deployedProductCount].mfdate = _mfdate;
        deployedproducts[deployedProductCount].expdate = _expdate;
        //deployedproducts[deployedProductCount].price = _price;
        deployedproducts[deployedProductCount].owner = _manufacturer;
        deployedproducts[deployedProductCount].isApproved = true;
        deployedproducts[deployedProductCount].approvedby = _approver;
        deployedproducts[deployedProductCount].purchased = false;
        
        //deployedproducts[deployedProductCount].intemediary.push(_manufacturer);
        // Create the product
     //  deployedproducts[deployedProductCount].approvedby = msg.sender;
     // deployedproducts[deployedProductCount] = DeployedProduct(deployedProductCount, _name, _price, _manufacturer, true, _approver, false,intemediary[0] =_manufacturer;
        // Trigger an event)
      //emit ProductDeployed(deployedProductCount, _name, _price, _manufacturer, true, _approver, false, );

    }

    // function transferProduct(uint _id) public payable {
    //     // Fetch the product
    //     Product memory _product = products[_id];
    //     // Fetch the owner
    //     address payable _seller = _product.owner;
    //     // Make sure the product has a valid id
    //     require(_product.id > 0 && _product.id <= productCount);
    //     // Require that there is enough Ether in the transaction
    //     require(msg.value >= _product.price);
    //      // Require that the product has been approved and certified by authority
    //     require(!_product.isApproved);
    //     // Require that the product has not been purchased already
    //     require(!_product.purchased);
    //     // Require that the buyer is not the seller
    //     require(_seller != msg.sender);
    //     // Transfer ownership to the buyer
    //     _product.owner = msg.sender;
    //     // // Mark as purchased
    //     // _product.purchased = false;
    //     // Update the product
    //     products[_id] = _product;
    //     // Pay the seller by sending them Ether
    //     address(_seller).transfer(msg.value);
    //     // Trigger an event
    //     emit ProductTransferred(productCount, _product.name, _product.price, msg.sender, true, true);
    // }


    constructor() public {
        name = "Benuka Withange";
    }

}