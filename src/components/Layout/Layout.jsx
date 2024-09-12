import React, { Fragment } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";

const Layout = () => {
  const  x= {
    name:"sd;"};

  x.id = "sd";

  console.log(x)
  return (
    <Fragment>
      {/* <p>sad</p> */}
      <Header />
      <div>
        <Routers />
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

      <Footer />
    </Fragment>
  );
};


export default Layout;
