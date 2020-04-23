import React, { useState, useEffect } from "react";
import styled from "styled-components";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 }
];
const calculateCookiesPerSecond = purchasedItems => {
  return Object.keys(purchasedItems).reduce((acc, itemId) => {
    const numOwned = purchasedItems[itemId];
    const item = items.find(item => item.id === itemId);
    const value = item.value;

    return acc + value * numOwned;
  }, 0);
};

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(100);

  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0
  });
  const addCookies = () => {
    setNumCookies(i => i + 1);
  };
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  useEffect(() => {
    console.log("ASdasdASDSDASD");
    document.title = `${numCookies} cookies`;
  }, [numCookies]);

  const useSpace = (event, callback) => {
    useEffect(() => {
      window.addEventListener(event, callback);
      return () => window.removeEventListener(event, callback);
    }, [event, callback]);
  };

  const useSpaceEvent = addCookies => {
    console.log("*****************");
    return useSpace("space", addCookies);
  };
  useSpaceEvent();

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerSecond(purchasedItems)}</strong> cookies
          per second
        </Indicator>
        <Button onClick={addCookies}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          return (
            <Item
              key={item.id}
              index={item.index}
              name={item.name}
              cost={item.cost}
              value={item.value}
              numOwned={purchasedItems[item.id]}
              handleClick={() => {
                if (numCookies < item.cost) {
                  alert("COOKIE MONSTER");
                  return;
                }
                setNumCookies(numCookies - item.cost);
                setPurchasedItems({
                  ...purchasedItems,
                  [item.id]: purchasedItems[item.id] + 1
                });
              }}
            />
          );
        })}
        />
      </ItemArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

export default Game;
