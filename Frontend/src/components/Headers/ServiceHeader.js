import { Button, Container, Row, Col } from "reactstrap";

const ServiceHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        // style={{
        //   minHeight: "600px",
        //   backgroundImage:
        //     "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center top",
        // }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Add a New Service</h1>

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ServiceHeader;