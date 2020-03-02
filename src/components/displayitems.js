import React from "react";

import axios from "axios";
import M from "materialize-css";
import { element } from "prop-types";
class DisplayItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      id: "",
      email: "",
      price: 0
    };

    this.passid = this.passid.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.handleemail = this.handleemail.bind(this);
    this.handleprice = this.handleprice.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    axios
      .get("https://vdbbudp5z9.execute-api.eu-west-2.amazonaws.com/Stage6/test")
      .then(data => {
        console.log("data is ", data.data);
        this.setState({
          array: data.data
        });
      })
      .catch(err => {
        console.log("error is", err);
      });
  }

  passid = value => {
    //console.log("id is ",value);

    this.setState({
      id: value
    });
  };
  handlesubmit = () => {
    console.log(this.state.id, this.state.email, this.state.price);

    if (this.state.email == "" || this.state.price == 0)
      alert("parameters cannot be empty");
    else {
      axios
        .post(
          "https://vdbbudp5z9.execute-api.eu-west-2.amazonaws.com/Stage6/test3",
          {
            id: this.state.id,
            email: this.state.email,
            price: this.state.price
          }
        )
        .then(data => {
          console.log("data is ", data.data);
          this.setState({
            email: "",
            id: ""
          });
          window.location.reload();

          alert("updated");
        })
        .catch(err => {
          console.log("error is", err);
          alert("could not update");
        });
    }
  };

  handleemail = e => {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  };

  handleprice = e => {
    e.preventDefault();
    this.setState({
      price: e.target.value
    });
  };

  render() {
    return (
      <div>
        <nav>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo center">
              Shopify Cart
            </a>
          </div>
        </nav>
        <br></br>
        <br></br>

        <div class="row">
          {this.state.array.map((item, i) => (
            <div class="col s12 m6 l4">
              <div class="card  darken-1">
                <div class="card-content ">
                  <span class="card-title">Product</span>

                  <p> Email: {item.email} </p>

                  <p> Total Price: {item.total_price}</p>

                  <p> Product id: {item.id} </p>
                  <p> Billing address: {item.billing_address.address1} </p>
                  <p>Financial status: {item.financial_status}</p>
          <p>Payment Gateway:  {item.gateway}</p>
                </div>
                <div class="card-action">
                  <a
                    class="waves-effect waves-light btn modal-trigger"
                    href="#modal1"
                    onClick={() => this.passid(item._id)}
                  >
                    Update
                  </a>
                </div>
              </div>
            </div>
          ))}

          <div id="modal1" class="modal">
            <div class="modal-content">
              <h4>Update Product Info</h4>
              <label for="first_name">Email</label>
              <input
                placeholder="email"
                id="first_name"
                type="text"
                class="validate"
                onChange={this.handleemail}
              ></input>
              <label for="first_name">Total Price</label>
              <input
                placeholder="total price"
                id="first_name"
                type="text"
                class="validate"
                onChange={this.handleprice}
              ></input>
            </div>
            <div class="modal-footer">
              <a
                href="#!"
                class="modal-close waves-effect waves-green btn-flat"
                onClick={this.handlesubmit}
              >
                Agree
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayItems;
