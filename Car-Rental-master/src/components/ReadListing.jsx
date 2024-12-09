import { useParams, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Container, Row, Col, Button } from "reactstrap";
import Base from "./Base";
import { auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import PaymentMethod from "./PaymentMethod";

export default function ReadListing(props) {
  //fetch the particular listing by listing id
  const [carData, setCarData] = useState([]);
  const { listingId } = useParams();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const fetchData = async () => {

    const docRef = doc(db, "cars", listingId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists) {
      console.log("Document Data:", docSnap.data().listed);
      console.log(docSnap.data());
      setCarData(docSnap.data());
    }
  }
  const listCar = async () => {
    try {
      await updateDoc(doc(db, "cars", listingId), {
        rented: true,
        rentedBy: user.uid
      })
      alert(`Rented successfully`)
      navigate('/dashboard')
    } catch (e) {
      alert(`error occured ${e}`)
    }
  }
  const returnCar = async ()=>{
    try{
      await updateDoc(doc(db,"cars",listingId),{
        rented:false,
        rentedBy: null,
      })
      alert(`Retned successfully`)
      navigate('/dashboard')
    }catch(e){
      alert(`error occured ${e}`)
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Base>
        <Container className="mt-3">
          <Card className="rounded-0 shadow-sm">
            <section>
              <Container style={
                {padding: "5vh"}
              }>
                <Row>
                  <Col lg="6">
                    <img src={carData.image} alt="" className="w-100" style={
                      {
                        maxHeight: "80vh",
                        marginTop: "10vh"
                      }
                    } />
                  </Col>

                  <Col lg="6">
                    <div className="car__info">
                      <h2 className="section__title">{carData.manufacturer} {carData.model}</h2>

                      <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                        <h6 className="rent__price fw-bold fs-4">
                          ${carData.price}.00 / Day
                        </h6>

                        <span className=" d-flex align-items-center gap-2">
                          <span style={{ color: "#f9a826" }}>
                            <i class="ri-star-s-fill"></i>
                            <i class="ri-star-s-fill"></i>
                            <i class="ri-star-s-fill"></i>
                            <i class="ri-star-s-fill"></i>
                            <i class="ri-star-s-fill"></i>
                          </span>
                          (5 ratings)
                        </span>
                      </div>

                      <p className="section__description">
                        {carData.description}
                      </p>

                      <div
                        className=" d-flex align-items-center mt-3"
                        style={{ columnGap: "4rem" }}
                      >
                        <span className=" d-flex align-items-center gap-1 section__description">
                          <i
                            class="ri-roadster-line"
                            style={{ color: "#f9a826" }}
                          ></i>{"Car Model:  "}
                          {carData.model}
                        </span>

                        <span className=" d-flex align-items-center gap-1 section__description">
                          <i
                            class="ri-settings-2-line"
                            style={{ color: "#f9a826" }}
                          ></i>{"Transmission type: "}
                          {carData.transmission}
                        </span>

                        <span className=" d-flex align-items-center gap-1 section__description">
                          <i
                            class="ri-timer-flash-line"
                            style={{ color: "#f9a826" }}
                          ></i>{"Fuel Type: "}
                          {carData.fuelType}
                        </span>
                      </div>

                      <div
                        className=" d-flex align-items-center mt-3"
                        style={{ columnGap: "2.8rem" }}
                      >
                        <span className=" d-flex align-items-center gap-1 section__description">
                          <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                          Gps :Yes
                        </span>

                        <span className=" d-flex align-items-center gap-1 section__description">
                          <i
                            class="ri-building-2-line"
                            style={{ color: "#f9a826" }}
                          ></i>{"Manufacturer: "}
                          {carData.manufacturer}
                        </span>
                      </div>
                    </div>
                  </Col>

                  <Col lg="7" className="mt-5">
                    <div className="booking-info mt-5">
                      <h5 className="mb-4 fw-bold ">Booking Information</h5>
                      <BookingForm />
                    </div>
                  </Col>

                  <Col className="mt-5">
                    <div className="payment__info mt-5">
                      <h5 className="mb-4 fw-bold ">Payment Information</h5>
                      <PaymentMethod />
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            {carData.ownerUserId != user?.uid && !(carData.rented) &&
              <Button onClick={listCar} color="primary">
                Rent Car
              </Button>}
            {carData.rentedBy === user?.uid &&
              <Button onClick={returnCar} color="primary"> Return</Button>}
          </Card>
        </Container>
      </Base></>
  );
}
