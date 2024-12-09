import { Card, Row, Col, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import ComparisonPage from "../pages/ComparisonPage";
import { auth } from "../firebase";
export default function Listing({
  listing,
  setCountSelected,
  canSelectMore,
  countSelected,
  selectedListings,
  setSelectedListings,
  handleCompare
}) {
  const [selected, setSelected] = useState(false);
  const [addClass, setAddClass] = useState("mt-3 rounded-0");

  const user = auth.currentUser
  
  const markSelected = () => {
    if (
      addClass.includes("selected") ||
      (!addClass.includes("selected") && canSelectMore)
    ) {
      setSelected(!selected);
    } else {
      return;
    }
  };

  useEffect(() => {
    selected
      ? setAddClass("shadow-lg mt-3 rounded-0 selected")
      : setAddClass("shadow-none mt-3 rounded-0");
    selected
      ? setCountSelected(countSelected + 1)
      : setCountSelected(countSelected - 1);

      selected ? setSelectedListings([...selectedListings, listing.id]) : (
        setSelectedListings(selectedListings.filter((item) => item != listing.id))
      ) 
  }, [selected]);

  return (
    <Card
      className={addClass}
      style={{
        width: "60vw",
        marginLeft: "15vw",
      }}
      onClick={markSelected}
    >
      <CardBody>
        <Row>
          <Col
            className="mt-2"
            md={{
              size: 3,
            }}
          >
            <img
              src={listing.image}
              alt="vehicle-image"
              style={{
                maxWidth: "200px",
                height: "200px",
              }}
            />
          </Col>
          <Col>
            <h2>{listing.make}</h2>
            <h2>{`${listing.model}  ${listing.year}`}</h2>
            <p
              style={{
                height: "17vh",
              }}
            >
              {listing.description.substring(0, 280) + "..."}
            </p>
            <Row>
              <Col md={
                {
                  size: 3
                }
              }>
                <Link to="/dashboard">{listing.ownerName}</Link>
              </Col>
              <Col
                md={{
                  size: 4,
                }}
              ></Col>
              <Col>
                {/* fix the url */}
                <Link to={"/listing/" + listing.id} docid={listing.id}>
                  Read More...
                </Link>
              </Col>
              <Col>
                {countSelected == 2 && addClass.includes("selected") ? (
                  <Link to="/comparison" state={{ compareListings: selectedListings }} className="btn btn-primary">Compare</Link>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Col>
          <Col
            md={{
              size: 1,
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 400,
              }}
            >
              3 days ago
            </p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
