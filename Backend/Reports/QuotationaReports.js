
module.exports = ({ InvoiceData, AccountData }) => {



    const today = new Date();
  
  
  
  
    // function getDueDate() {
  
    //     let date = Number(today.getDate());
    //     let month = Number(today.getMonth());
    //     let year = Number(today.getFullYear());
    //     let duedate = date + 10;
    //     month = month + 2;
  
    //     let retDate = ''
    //     if (duedate > 30) {
    //         const duedate = duedate - 30;
    //         if (month + 1 == 13) {
  
    //             if (month == 12) {
    //                 const month = 1;
    //                 const year = year + 1
  
    //             } else {
    //                 const month = month + 2;
    //                 const year = year
  
    //             }
  
  
  
  
    //         }
  
    //     }
  
    //     retDate = duedate + ". " + month + ". " + year
  
    //     return retDate;
  
    // }
  
  
    return `
    
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Example 1</title>
       <style>
    .clearfix:after {
      content: "";
      display: table;
      clear: both;
    }
    
    a {
      color: #5D6975;
      text-decoration: underline;
    }
    
    body {
      position: relative;
      width: 20cm;  
      height: 28cm; 
    
      color: #001028;
      background: #FFFFFF; 
      font-family: Arial, sans-serif; 
      font-size: 12px; 
      font-family: Arial;
         
         
           
            /* to centre page on screen*/
            margin-left: auto;
            margin-right: auto;
         margin-top : 30px;
         
    }
    
    header {
      padding: 10px 0;
      margin-bottom: 30px;
    }
    
    #logo {
     
      margin-bottom: 10px;
     float: right;
     margin-top:-78px;
      
    
    }
    
    #logo img {
      width: 200px;
    }
    
    h1 {
     
      color: #5D6975;
      font-size: 2.4em;
      line-height: 1.4em;
      font-weight: normal;
      text-align: left;
      margin: 0 0 5px 0;
      background: url(dimension.png);
    }
    
    #project {
      float: left;
      margin-top:50px;
         
    }
    
    #project span {
      color: #5D6975;
     font: small-caption;
      width: 52px;
      margin-right: 42px;
      margin-top: 5px;
      display: inline-block;
      font-size: 11px;
         font-weight:600;
    }
    
    #company {
      float: right;
      text-align: right;
          margin-top:50px;
      margin-right: -195px;
    }
         
    #company span {
    
    font: small-caption;
    width: 52px;
    
    margin-top: 7px;
    
    font-size: 13px;
    font-weight:500;
    }
    
    #project div,
    #company div {
      white-space: nowrap;        
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 50px;
      margin-top:80px;
    }
    
    table tr:nth-child(2n-1) td {
      background: #F5F5F5;
    }
    
    table th,
    table td {
     font: small-caption;
        
      text-align: center;
    }
    
    table th {
      padding: 5px 20px;
      
      border-bottom: 1px solid #C1CED9;
      white-space: nowrap;        
      font-weight: 500;
      font-size:13px
    }
    
    table .service,
    table .desc {
      text-align: left;
    }
    
    table td {
      padding: 20px;
      text-align: right;
      font-size:12px
    }
    
    table td.service,
    table td.desc {
      vertical-align: top;
    }
    
    table td.unit,
    table td.qty,
    table td.total {
      font-size: 1.0em;
    }
    
    table td.grand {
      border-top: 1px solid #5D6975;;
    }
    
    #notices .notice {
      color: #5D6975;
      font-size: 1.2em;
        
    }
    
    footer {
      color: #5D6975;
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #C1CED9;
      padding: 8px 0;
      text-align: left;
    }
    
    
    </style>
      </head>
      <body>
        <header class="clearfix">
          <div id="logo">
            <img src="https://res.cloudinary.com/colouration/image/upload/v1674509961/CompanyLogo/Coloration_vis1xc.png">
          </div>
          <h1>QUOTATION </h1>
            
          <div id="company" class="clearfix">
            <div><span>Coloration Colombo</span></div>
            <div><span>72/3</span></div>
    
            <div><span>Udumulla Rd</span></div>
            <div><span>Battaramulla</span></div>
         
          
         
            <div><span style="margin-top:5px;">071 1416409</span></div>
            <div><span><a href="yashoda.coloration@gmail.com">yashoda.coloration@gmail.com</a></span></div>
          </div>
            
            
          <div id="project">
             <div><span>QUOTATION NO</span><div style="font-size:13px; display:inline-block; font-weight:500;">QUOT-${InvoiceData.quotationaNumber}</div></div>
            <div><span>PROJECT</span><div style="font-size:13px; display:inline-block; font-weight:500;"> ${InvoiceData.productDetails[0].productName}</div></div>
            <div><span>CLIENT</span><div style="font-size:13px; display:inline-block; font-weight:500;">${AccountData.HolderName}</div></div>
            <div><span>COMPANY</span><div style="font-size:13px; display:inline-block; font-weight:500;">${AccountData.CompanyName}</div></div>
            <div><span>ADDRESS</span><div style="font-size:13px; display:inline-block; font-weight:500;">  ${InvoiceData.accountAddress}</div></div>
            <div><span>EMAIL</span><div style="font-size:13px; display:inline-block; font-weight:500;">  ${AccountData.CompanyEmailAddress}</a></div></div>
            <div><span>PHONE NO</span><div style="font-size:13px; display:inline-block; font-weight:500;">  ${AccountData.CompanyPhonenumber}</div></div>
            <div><span>DATE</span><div style="font-size:13px; display:inline-block; font-weight:500;">   ${InvoiceData.date}</div></div>
          </div>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th class="service">PROD NAME</th>
                
                <th class="desc">DESCRIPTION</th>
                 <th class="service">RATE</th>
                <th>QTY</th>
                <th>DISC</th>
                <th style="text-align:right;" >TOTAL</th>
              </tr>
            </thead>
            <tbody>
            ${InvoiceData.productDetails.map((obj, index) =>
  
      ` 
            <tr>
  
                <td class="service">${obj.productName}</td>
               
                <td class="desc">${obj.productOtherDes}</td>
                 <td class="service">LKR : ${(Number(obj.productamount)).toLocaleString('en-US')}</td>
                <td class="unit">${obj.productqty}</td>
                <td class="qty">${obj.productDiscount}%</td>
                <td class="total">LKR : ${(Number(obj.producttotalamount)).toLocaleString('en-US')}</td>
  
              </tr>`
  
    )}
  
            
              <tr>
                <td colspan="5" style="border-top: 1px solid #5D6975;">SUBTOTAL :</td>
                <td class="total" style="border-top: 1px solid #5D6975;">LKR : ${(Number(InvoiceData.subTotal)).toLocaleString('en-US')}</td>
              </tr>
             
              <tr>
                <td colspan="5">DISCOUNT :</td>
                <td class="total">${InvoiceData.discount}%</td>
              </tr>
              <tr>
                <td colspan="5" class="grand total" style="border: outset;">TOTAL :</td>
                <td class="grand total" style="border: outset;font-weight:600;" >LKR : ${(Number(InvoiceData.totalAmount)).toLocaleString('en-US')}</td>
              </tr>
            </tbody>
          </table>
          <div id="notices">
          
          </div>
        </main>
        <footer>
          Phone: +94711416409 <span style="margin-left:60px;"> Email: yashoda.coloration@gmail.com</span>
        </footer>
      </body>
    </html>
      `;
  };
  