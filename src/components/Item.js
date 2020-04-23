import React from "react";
import styled from "styled-components";

const Item = ({ name, cost, value, numOwned, handleClick, index }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (index === 0) {
      ref.current.focus();
    }
  });
  return (
    <Wrapper ref={ref} onClick={handleClick}>
      <div>
        <Name>{name}</Name>
        <Info>
          Cost:{cost} cookie(s) Produces:{value} cookies/second
        </Info>
      </div>
      <div>{numOwned}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  border-bottom: 1px solid #444;
  color: #fff;
  text-align: left;
  padding: 15px 0;
`;

const Name = styled.h3`
  font-size: 25px;
`;

const Info = styled.div`
  font-size: 15px;
`;
export default Item;
