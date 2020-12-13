import React from 'react';
import Tube from '../Tube';
import { useSelector } from 'react-redux';
import { selectNodes } from 'slices/nodes';
import { selectElements } from 'slices/elements';

const TubeGroup = (props) => {
  const elements = useSelector(selectElements);
  const nodalCoords = useSelector(selectNodes);
  const tubes = [];

  for (const ele in elements) {
    const nodeI = nodalCoords.find(node => node.id === elements[ele].i);
    const nodeJ = nodalCoords.find(node => node.id === elements[ele].j);
    let key = ele;
    for (let i in nodeI) {
      key += nodeI[i].toString() + nodeJ[i].toString();
    }
    tubes.push(
      <Tube
        nodeI={nodeI}
        nodeJ={nodeJ}
        name={elements[ele].id}
        key={key}
      />
    );
  }

  return (
    <>
      {tubes}
    </>
  );
}

export default TubeGroup;
