import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  List,
} from "reactstrap";
import Base from "../components/Base";
export default function About() {
  return (
    <Base>
      <Container className="text-center mt-3">
        <Card className="rounded-0">
          <CardHeader><h1>About us</h1></CardHeader>
          <CardBody>
            <List tag="ol">
              <li>
                <Row>
                  <Col
                    md={{
                      size: 3,
                    }}
                  >
                    <img src="https://media.licdn.com/dms/image/C4D03AQFREFBIPie8xg/profile-displayphoto-shrink_200_200/0/1650052367448?e=1681344000&v=beta&t=LXZ78fY2GNlPos9pzveUBmB7aLE4wAgw37peYUlDDwg" height={150} width={150} />
                  </Col>
                  <Col className="mt-5">
                    <h4>Arth Srivastava</h4>
                    <h4>Worked On: CSS + React</h4>
                  </Col>
                </Row>
              </li>
              <li className="mt-3">
                <Row>
                  <Col
                    md={{
                      size: 3,
                    }}
                  >
                    <img src="https://media.licdn.com/dms/image/C4E03AQHWQxBX14eesg/profile-displayphoto-shrink_200_200/0/1631427193057?e=1681344000&v=beta&t=zAKc0Zzd6Sp0m3jItXhumErhHDNZ2-G4MoSWOMmjyQk" height={150} width={150} />
                  </Col>
                  <Col className="mt-5">
                    <h4>Mihir Singh</h4>
                    <h4>Worked On: Node + React</h4>
                  </Col>
                </Row>
              </li>
              <li className="mt-3">
                <Row>
                  <Col
                    md={{
                      size: 3,
                    }}
                  >
                  <img src="https://media.licdn.com/dms/image/C5603AQH-Rlzjwqhfgw/profile-displayphoto-shrink_200_200/0/1611500674483?e=1681344000&v=beta&t=NDQkA-yONlY5vwFu8ivC_XeIjJKO-7VAij1Ic6dlyrA" height={150} width={150} />
                  </Col>
                  <Col className="mt-5">
                    <h4>Swapnil Saxena</h4>
                    <h4>Worked on: CSS + React</h4>
                  </Col>
                </Row>
              </li>
            </List>
          </CardBody>
        </Card>
      </Container>
    </Base>
  );
}
