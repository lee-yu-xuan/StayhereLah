import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";
import { React, useEffect, useState } from "react";
import NeighbourhoodDetails from "../components/NeighbourhoodDetails";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-size: cover;
  flex-direction: column;
`;

const NeighbourhoodSelection = () => {
  const location = useLocation();
  const urlName = location.pathname.split("/"); //http://localhost:3000/bto/mature/0
  const id = urlName[2];

  const [data, setData] = useState(null);
  useEffect(() => {
    onValue(ref(db), async (snapshot) => {
      const data = await snapshot.val();
      console.log(data["nonmature"]["01Project_Name"][0]);
      setData(data);
    });
  }, []);
  return (
    <>
      {data && (
        <Container>
          <Header />
          <NeighbourhoodDetails data={data} id={id} />
        </Container>
      )}
    </>
  );
};

export default NeighbourhoodSelection;
