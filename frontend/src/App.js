import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import Productpage from './pages/Productpage'
import CartPage from './pages/Cartpage'
import NewArrivals from './pages/NewArrivals'
import Loginpage from './pages/Loginpage'
import Registerpage from './pages/Registerpage'
import Profilepage from './pages/Profilepage'
import Shippingpage from './pages/Shippingpage'
import Paymentpage from './pages/Paymentpage'
import Checkoutpage from './pages/Checkoutpage'
import PlaceOrderpage from './pages/PlaceOrderpage'
import Orderpage from './pages/Orderpage'
import Adminpage from './pages/Adminpage'
import Contactpage from './pages/Contactpage'
import Shop from './pages/Shop'

const App = () => {

  return (
    <Router>
      <Header/>
      <Route path="/register" component={Registerpage}/>
      <Route path="/login" component={Loginpage}/>
      <Route path="/profile" component={Profilepage}/>
      <Route path="/product/:id" exact component={Productpage}/>
      <Route path="/cart/:id?" component={CartPage}/>
      <Route path="/checkout" component={Checkoutpage}/>
      <Route path="/shipping" component={Shippingpage}/>
      <Route path="/payment" component={Paymentpage}/>
      <Route path="/placeorder" component={PlaceOrderpage}/>
      <Route path="/order/:id" component={Orderpage}/>
      <Route path="/shop/:gender" exact component={Shop}/>
      <Route path="/shop/:gender/:category" exact component={Shop}/>
      <Route path="/new" exact component={NewArrivals}/>
      <Route path="/admin" exact component={Adminpage}/>
      <Route path="/shop/:gender/:category/search/:keyword" component={Shop} exact/>
      <Route path="/page/:pageNumber" component={Homepage} exact />
      <Route path="/search/:keyword/page/:pageNumber" component={Shop} exact />
      <Route path="/contact" exact component={Contactpage}/>
      <Route path="/" exact component={Homepage}/>
      <Footer/>
    </Router>
  )
}

export default App
