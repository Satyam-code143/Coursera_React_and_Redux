import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const requied = (val) => val && val.length;

const maxLength = (len) => (val) => !val || val.length <= len;

const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
    };
  }

  toggleModal = () => {
    this.setState({
      isModal: !this.state.isModal,
    });
  };
  handleComment = (values) => {
    this.toggleModal();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.authorName,
      values.comment
    );
  };

  render() {
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-edit fa-lg">Sbmit Comment</span>
        </Button>
        <Modal isOpen={this.state.isModal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleComment(values)}>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="starRate">Rating</Label>
                  <Control.select
                    model=".starRate"
                    className="form-control"
                    name="starRate"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="authorName">Your Name</Label>
                  <Control.text
                    model=".authorName"
                    type="text"
                    id="authorName"
                    name="authorName"
                    className="form-control"
                    placeholder="Your Name"
                    validators={{
                      requied,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".authorName"
                    show="touched"
                    messages={{
                      requied: "Required",
                      minLength: "Must be greater than 2 charecters",
                      maxLength: "Must be 15 charecters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Button
                type="submit"
                value="submit"
                className="bg-primary"
                color="primary"
              >
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderDish({ dish }) {
  if (dish !== null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.5) translate(-50%)",
          }}
        >
          <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments !== null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
          {comments.map(({ id, author, comment, date }) => {
            return (
              // <ul className="list-unstyled" key={id}>
              <Fade in key={id}>
                <li>{comment}</li>
                <li>
                  -- {author}, {dateFormat(date, "mmmm dS, yyyy")}
                </li>
              </Fade>
              // </ul>
            );
          })}
        </Stagger>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishdetailComponent = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link active>{props.dish.name}</Link>
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  }
};

export default DishdetailComponent;
