import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  CardBody,
  Form,
  FormGroup,
  Container,
  Card,
  Row,
  Col,
  Label,
  Input,
  Button,
} from "reactstrap";
import Base from "../components/Base";
import { db, auth } from "../firebase";
import axios, { Axios } from "axios";
export default function AddListing() {
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [image, setImage] = useState("");
  const [transmission, setTransmission] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [isLoading, setIsLoading] = useState(false);

  //create listing on firebase
  const createListing = async (e) => {
    e.preventDefault(e);
    setError("");
    setIsLoading(true);
    // console.log(`${model} ${year} ${manufacturer} ${description} ${fuelType}`)
    if (
      model === "" ||
      year === "" ||
      manufacturer === "" ||
      vehicleType === "" ||
      fuelType === ""
    ) {
      setError("Please complete the form to proceed");
      return;
    }
    const options = {
      method: "GET",
      url: `https://dorian-opposite-utahraptor.glitch.me/carDescription?model=${model}&make=${manufacturer}`,
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      let response = await axios.request(options);
      console.log(response.data.description);
      setDescription(response.data.description);
      await addDoc(collection(db, "cars"), {
        model: model,
        year: year,
        manufacturer: manufacturer,
        description: response.data.description,
        fuelType: fuelType,
        ownerUserId: user.uid,
        image: image,
        transmission: transmission,
        vehicleType: vehicleType,
        rented: false,
        rentedBy: null,
        price: price,
        comments: [],
        ownerName: user.displayName
      });
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }

    navigate("/dashboard");
  };

  return (
    <Base>
      <Container className="mt-3">
        {console.log(description)}
        <Row>
          <Col
            md={{
              size: 6,
              offset: 3,
            }}
          >
            <h2>Listing Form</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {isLoading && (
              <Container className="text-center">
                <div class="loading-element">
                  <img src="../assets/loading.svg" alt="" />
                </div>
                </Container>
            )}
            {!isLoading && (
              <Card className="rounded-0 shadow-sm">
                <CardBody>
                  <Form onSubmit={createListing}>
                    <FormGroup>
                      <Label for="model">
                        <h4>Car Model</h4>
                      </Label>
                      <Input
                        type="text"
                        id="model"
                        name="model"
                        onChange={(e) => setModel(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="manufacturer">
                        <h4>Manufacturer</h4>
                      </Label>
                      <Input
                        type="text"
                        id="manufacturer"
                        name="manufacturer"
                        onChange={(e) => setManufacturer(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="year">
                        <h4>Year</h4>
                      </Label>
                      <Input
                        type="text"
                        id="year"
                        name="year"
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="price">
                        <h4>Listing Price/ day</h4>
                      </Label>
                      <Input
                        type="number"
                        id="price"
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="image">
                        <h4>Image</h4>
                      </Label>
                      <Input
                        type="text"
                        id="image"
                        name="image"
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="transmission">
                        <h4>Transmission</h4>
                      </Label>
                      <Input
                        type="select"
                        id="transmission"
                        name="transmission"
                        defaultValue="temp"
                        onChange={(e) => setTransmission(e.target.value)}
                      >
                        <option disabled value="temp">
                          --Select type--
                        </option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="vehicle_type">
                        <h4>Vehicle Type</h4>
                      </Label>
                      <Input
                        type="select"
                        id="vehicle_type"
                        name="vehicle_type"
                        defaultValue="temp"
                        onChange={(e) => setVehicleType(e.target.value)}
                      >
                        <option disabled value="temp">
                          --Select type--
                        </option>
                        <option value="Two wheeler">Two wheel drive</option>
                        <option value="Four wheeler">Four wheel drive</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="fuel">
                        <h4>Fuel type</h4>
                      </Label>
                      <Input
                        type="select"
                        id="fuel"
                        name="fuel"
                        defaultValue="temp"
                        onChange={(e) => setFuelType(e.target.value)}
                      >
                        <option disabled value="temp">
                          --Select type--
                        </option>
                        <option value="Petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                      </Input>
                    </FormGroup>
                    <Container className="text-center">
                      <Button color="primary">Submit</Button>
                      <Button type="reset" color="warning" className="ms-2">
                        Reset
                      </Button>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </Base>
  );
}
