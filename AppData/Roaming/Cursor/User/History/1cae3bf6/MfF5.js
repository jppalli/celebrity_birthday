import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Block from './Block';

const { width } = Dimensions.get('window');
const GRID_SIZE = 8;
const BLOCK_SIZE = width / GRID_SIZE;

const GameBoard = () => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const newGrid = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      const row = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        row.push({
          id: `${i}-${j}`,
          color: getRandomColor(),
          x: i,
          y: j,
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

  const getRandomColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleBlockPress = (block) => {
    const matches = findMatches(block);
    if (matches.length >= 3) {
      removeMatches(matches);
    }
  };

  const findMatches = (block) => {
    const matches = [block];
    const color = block.color;
    const visited = new Set();

    const checkNeighbor = (x, y) => {
      if (
        x < 0 ||
        x >= GRID_SIZE ||
        y < 0 ||
        y >= GRID_SIZE ||
        visited.has(`${x}-${y}`)
      ) {
        return;
      }

      const neighbor = grid[x][y];
      if (neighbor.color === color) {
        matches.push(neighbor);
        visited.add(`${x}-${y}`);
        checkNeighbor(x + 1, y);
        checkNeighbor(x - 1, y);
        checkNeighbor(x, y + 1);
        checkNeighbor(x, y - 1);
      }
    };

    checkNeighbor(block.x, block.y);
    return matches;
  };

  const removeMatches = (matches) => {
    const newGrid = [...grid];
    matches.forEach((block) => {
      newGrid[block.x][block.y] = {
        ...block,
        color: getRandomColor(),
      };
    });
    setGrid(newGrid);
    setScore(score + matches.length * 10);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.grid}>
        {grid.map((row) =>
          row.map((block) => (
            <Block
              key={block.id}
              block={block}
              size={BLOCK_SIZE}
              onPress={() => handleBlockPress(block)}
            />
          ))
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameBoard; 