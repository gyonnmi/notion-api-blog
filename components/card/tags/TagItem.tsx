import React from 'react';

interface TagItemProps {
  name: string;
  color: string;
}

const TagItem = ({ name, color }: TagItemProps) => {
  return (
    <li>
      <button>{name}</button>
    </li>
  );
};

export default TagItem;
