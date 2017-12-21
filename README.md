# node-js-version-controlled-key-value

# Requirements

    -Node.js
    -Express.js
    -MySqlDB

# GUIDE


*** install database to mysql ***

PATH: /database/database.sql

*** change configuration file with your settings ***

PATH: /config/connect.js

*** ***

*** Access the form and provide 2 required fields then submit the form ***


Method: POST

Endpoint: /

Parameters: (key:mykey,value:value1)

response: JSON DATA

------


*** Access the given URL to get the latest value of key ***


Method: GET 

Endpoint: /object/:yourkey

Response: {"value": value1 } 


------


*** Access the given URL to get the latest value of key with the timestamp paramater ***

Method: GET 

Endpoint: /object/:yourkey?timestamp=1440568980

Response: {"value": value2 } 



*** Access the given URL to get all the records from the database ***


Method: GET 

Endpoint: /records

Response: {"key":"test1","value":"val1","timestamp":1511253434},{"key":"test1","value":"val2","timestamp":1511251241} 


*** Working app link ***


http://ec2-54-175-9-64.compute-1.amazonaws.com/


#Developer
Zoilo Rabang
2017-12-21
