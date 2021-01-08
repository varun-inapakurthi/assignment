Steps to run the app: <br/>
    - Clone the repository <br/>
    - Run `npm install` <br/>
    -PORT=5000 <br/>
    ________________________________________________________________________

    - User routes:
       1)User Register: (POST /api/auth/register) 
            { 
                "username":"username",
                "password":"password",
                "typeOfUser":"typeOfUser" (Seller or Buyer) 
            } 
        2)User Login: (POST /api/auth/login) 
            {
                "username":"username", 
                "password":"password"
            }
    ____________________________________________________________________________

    -Seller routes: (protected- need authorization header with =>Bearer {token})
        1)Create a catalog for seller: (POST /api/seller/create-catalog) 
            {
                "products":[
                    {
                    "name":"Product1", (unique name)
                    "price":"1"
                    }
                    {
                    "name":"Product2",
                    "price":"2"
                    },
                    {
                    "name":"Product3",
                    "price":"3"
                    }
                ]
            }
        2)List all orders:(GET /api/seller/orders)
    _____________________________________________________________________________

    Buyer routes:(protected- need authorization header with =>Bearer {token})
        1)List all sellers: (GET /api/buyer/list-of-sellers)

        2)Get catalog of seller by seller id: (GET /api/buyer/seller-catalog/:seller_id)

        3)Create order with the seller catalog items:(POST /api/buyer/create-order/:seller_id)
            {
                orders:["productId1","productId2",...]
            }
            Note: 1)Product ids can be fetched from (GET /api/buyer/seller-catalog/:seller_id)
                  2)Products ids shuold only be from seller catalog

