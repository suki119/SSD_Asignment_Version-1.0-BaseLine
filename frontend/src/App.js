import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';



import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import home from "./Component/Home/home";
import createAccount from "./Component/Account/createAccount";

import updateAccount from "./Component/Account/updateAccount";
import Product from "./Component/Products/AddProduct";
import invoice from "./Invoice/invoice";
import ProductView from "./Component/Products/ProductView";
import UpdateProduct from "./Component/Products/UpdateProduct";
import advance from "./Component/Advance/advance";
import AllInvoices from "./Component/AllInvoices/AllInvoices";
import quotation from "./Component/Quotation/quotation";
import InvoiceList from "./Component/Payminder/InvoiceList";
import EmailSennder from "./Component/Payminder/EmailSennder";
import Login from "./Component/Login/Login";


function App() {

  return (
    <div>
      <Router>
        <Switch>


          <Route exact path='/Accounts' component={createAccount} />
          <Route exact path='/edit_Account/:id' component={updateAccount} />


          {/* product Component*/}
          <Route exact path='/products' component={Product} />
          <Route exact path='/products/:id' component={ProductView} />
          <Route exact path='/edit_Product/:id' component={UpdateProduct} />


          {/* Invoice Component*/}
          <Route exact path='/invoice' component={invoice} />

          {/*All Invoice Component*/}
          <Route exact path='/allInvoice' component={AllInvoices} />

          {/* Advance Component*/}
          <Route exact path='/advance' component={advance} />

          {/* Quotation Component*/}
          <Route exact path='/quotation' component={quotation} />

          {/* Payminder Component*/}
          <Route exact path='/invoiceList' component={InvoiceList} />

          {/* EmailSennder Component*/}
          <Route exact path='/emailSennder/:id' component={EmailSennder} />




          <Route exact path='/' component={Login} />


          <Redirect to='/' component={Login} />

        </Switch>

      </Router>

    </div>
  )
}

export default App;
