import React, { useState, DragEvent } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import styles from './dndLayout.module.scss';

export interface IProps {
  items: IElement[];
}

export interface IElement {
  name: string,
  component: any,
  args: any,
}

interface PositionState {
  x: number,
  y: number,
}

export const DnDLayout = ({ items }: IProps) => {
  const initialPositions: { [index: string]: PositionState } = {}
  items.forEach(item => {
    initialPositions[item.name] = {
      x: 0,
      y: 0,
    }
  });
  const [positions, setPositions] = useState<{ [index: string]: PositionState }>(initialPositions);

  const eventLogger = (e: DraggableEvent, data: DraggableData) => {
    const id = data.node.attributes.getNamedItem('data-drag-id')?.value;
    if (!id) {return;}
    // calculate the size difference

    const {x, y} = positions[id]
    if (Math.abs(data.lastX - x) + Math.abs(data.lastY - y) < 10) {
      console.log('Mini move');
      e.stopPropagation();
      e.preventDefault();
      return
    }
    const change: { [index: string]: PositionState } = {}
    change[id] = {
      x: data.lastX,
      y: data.lastY
    }
    setPositions(positions => Object.assign({}, positions, change))
  };

  const wrapperDragged = (event: DragEvent<HTMLDivElement>) => {
    console.log(event);
  }

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    // return false;
  }

  const children = items.map(item => {
    return (
      <Draggable
        key={item.name}
        grid={[10, 10]}
        scale={1}
        position={positions[item.name]}
        positionOffset={{x: 50, y: 50}}
        onStop={eventLogger}>

        <div
          data-drag-id={item.name}
          className={styles.item}
        >
          { React.createElement(item.component, item.args) }
        </div>

      </Draggable>
    )
  })

  return (
    <div className={styles.wrapper} onDragStart={onDragStart} onDrag={wrapperDragged} draggable>
      { children }
    </div>
  );
}
