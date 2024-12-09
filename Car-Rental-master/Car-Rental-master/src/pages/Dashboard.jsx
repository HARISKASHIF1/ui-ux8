import { Container } from "reactstrap";
import Base from "../components/Base";
import Listing from "../components/Listing";
import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink as ReactLink } from "react-router-dom";
import ComparisonPage from "./ComparisonPage";
export default function Dashboard() {
  //fetch the listings from the database
  const [listings, setListings] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  //to select 2 cars only
  const [countSelected, setCountSelected] = useState(1);
  const [canSelectMore, setCanSelectMore] = useState(true);

  const [selectedListings, setSelectedListings] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "cars"));
    setIsLoading(true)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let fetchedListings = [];
      querySnapshot.forEach((doc) => {
        fetchedListings.push({ ...doc.data(), id: doc.id });
      });
      setListings(fetchedListings);
      setIsLoading(false)
      console.log(listings);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    countSelected == 2 ? setCanSelectMore(false) : setCanSelectMore(true);
  }, [countSelected]);

  return (
    <Base>
      <Container>
        <h1 className="ms-3 mt-3">Recent Listings</h1> 
        <h4 style={
            {
                marginLeft:"15px"
            }
        }>(Can't decide? Select any 2 cars for detailed comparison by cohere AI model )</h4>
        {isLoading && (
          <Container className="text-center">
            <div class="loading-element">
              <img src="../assets/loading.svg" alt="" />
            </div>
          </Container>
        )}
        {
            !isLoading &&
          /* map over listings and pass the items to Listing.jsx component as props */
          listings.map((listing, index) => (
            <Listing
              listing={listing}
              key={index}
              setCountSelected={setCountSelected}
              canSelectMore={canSelectMore}
              countSelected={countSelected}
              selectedListings={selectedListings}
              setSelectedListings={setSelectedListings}
            />
          ))
        }
      </Container>
    </Base>
  );
}
