import React from "react";
import styles from "./ResourceCard.module.css";
import {
  Button,
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
} from "reactstrap";

const ResourceCard = ({
  title,
  description,
  link,
  type,
  topic,
  resource,
  handleDeleteResource,
}) => {
  const goToResource = () => {
    window.open(link);
  };

  return (
    <Col sm="6" md="6" lg="4">
      <Card body className={styles.card}>
        <CardSubtitle
          style={{ textAlign: "right", color: "#979fa5", fontSize: "15px" }}
        >
          {type}
        </CardSubtitle>

        <CardTitle className={styles.cardTitle}>{title}</CardTitle>
        <CardText>{description}</CardText>

        <Row>
          <Col xs="3" sm="3" md="3" lg="3">
            <Button
              style={{
                width: "100%",
                backgroundColor: "rgb(255, 0, 70)",
                borderColor: "rgb(255, 0, 70)",
              }}
              onClick={() => handleDeleteResource(resource, topic)}
            >
              <i className="fas fa-trash-alt"> </i>
            </Button>
          </Col>
          <Col xs="9" sm="9" md="9" lg="9">
            <Button style={{ width: "100%" }} onClick={goToResource}>
              Open
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ResourceCard;
