const path = require("path");
const dotenv = require("dotenv");
dotenv.config( {path:"./config.env"})


const swaggerSettings = {
  definition : {
      openapi: "3.0.0",
      info:{
          title:"E-commerce RestAPI Documentation",
          version:"1.0.0"
      },
      servers:[
        {
         url:"https://e-commerce-academlo-2.herokuapp.com/"
        }
      ],
      components: {
        securitySchemes:{
          bearerAuth:{
            type: "http",
            scheme: "bearer",
          }
        }
      }

  },
  apis:[
      `${path.join(__dirname, "../routes/*.js")}`,
  ]
}



module.exports = {swaggerSettings}