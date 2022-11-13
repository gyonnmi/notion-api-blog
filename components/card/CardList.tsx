import React from 'react';
import { CardData } from 'types/types';

interface CardListProps {
  data: CardData[];
}

const CardList = ({ data }: CardListProps) => {
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};

export default CardList;
