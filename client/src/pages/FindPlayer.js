import React, { Component, createRef } from "react";
import { Background, Navbar } from "../components/Components";
import { Row, Col, Container, Button, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class FindPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      playerId: "67094798ad7s097adf9ad0f",
      findContainer: {
        color: "white",
        fontSize: "2rem"
      },
      redirect: false,
      loading: false,
      inputTag: {
        color: "white",
        background: "transparent",
        border: "none"
      },
      findPlayer: {
        color: "white",
        fontSize: "1.5rem",
        borderColor: "white"
      },
      errorStyle: {
        color: "white",
        fontSize: "1.5rem"
      }
    };
  }
  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateWindowDimensions);
  };
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  inputRef = createRef();

  findPlayerActivate = () => {
    this.setState({
      error: false
    });
    let inputValue = this.inputRef.current.value;
    let valid = true;
    if (inputValue.length !== 20) {
      valid = false;
      this.setState({
        error: "User id not long enough"
      });
    }
    if (valid) {
      this.setState({
        loading: true
      });
    }
  };
  cancelFinding = () => {
    this.setState({
      loading: false
    });
  };
  render() {
    return (
      <Background>
        <Navbar playerId={this.state.playerId} />
        <Container>
          <Row style={{ height: this.state.height * 0.2 }} />
          <Row className="text-center">
            <Container className="text-center" style={this.state.findContainer}>
              <Col>
                <input
                  onKeyPress={event => {
                    if (event.key === "Enter") {
                      this.findPlayerActivate();
                    }
                  }}
                  disabled={this.state.loading ? "disabled" : ""}
                  ref={this.inputRef}
                  placeholder="Friend's id..."
                  style={this.state.inputTag}
                  maxlength="20"
                />
              </Col>
            </Container>
          </Row>
          <Row style={{ height: this.state.height * 0.1 }} />
          <Row>
            <Container className="text-center">
              {this.state.loading ? (
                <div>
                  <Row>
                    <Container className="text-center">
                      <p style={{ color: "white" }}>
                        Waiting for your friend to join
                      </p>
                    </Container>
                  </Row>
                  <Row>
                    <Container className="text-center">
                      <Spinner animation="border" style={{ color: "white" }} />
                    </Container>
                  </Row>
                  <Row style={{ height: this.state.height * 0.05 }} />
                  <Row>
                    <Container className="text-center">
                      <Button
                        className="bg-transparent"
                        style={this.state.findPlayer}
                        onClick={this.cancelFinding}
                      >
                        Cancel
                      </Button>
                    </Container>
                  </Row>
                </div>
              ) : (
                <Button
                  className="bg-transparent"
                  style={this.state.findPlayer}
                  onClick={this.findPlayerActivate}
                >
                  Find Player
                </Button>
              )}
            </Container>
          </Row>
          <Row style={{ height: this.state.height * 0.1 }} />
          <Row>
            <Container className="text-center" style={this.state.errorStyle}>
              {this.state.error ? `Error: ${this.state.error}` : ""}
            </Container>
          </Row>
        </Container>
        {this.state.redirect ? <Redirect to="/game" /> : ""}
      </Background>
    );
  }
}

export default FindPlayer;