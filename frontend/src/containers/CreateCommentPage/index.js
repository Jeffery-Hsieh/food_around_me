import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class CreateCommentPage extends Component {
  constructor() {
    this.state = {

    }
  }

  createNewComment() {

  }

  render() {
    return (
      <div className="container">
        <Form>
          <FormGroup>
            <Label for="exampleEmail">ShopName</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Select shop</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>Angle Cafe</option>
              <option>Cuppii</option>
              <option>Leveger</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Your Comment</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">File</Label>
          </FormGroup>
            <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapState = ({ web3 }) => ({
  ContractGeneratorInstance: web3.commentGenerator
})

const mapDispatch = { }

export default connect(mapState, mapDispatch)(CreateCommentPage);
