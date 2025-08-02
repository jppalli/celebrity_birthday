# 2D Platformer Engine

A simple 2D platformer engine built with C++ and SFML.

## Features

- Basic physics (gravity, jumping)
- Platform collision detection
- Smooth player movement
- Simple level system

## Controls

- Left Arrow: Move left
- Right Arrow: Move right
- Space: Jump

## Requirements

- CMake 3.10 or higher
- C++17 compatible compiler
- SFML 2.5 or higher

## Building the Project

1. Create a build directory:
```bash
mkdir build
cd build
```

2. Generate build files:
```bash
cmake ..
```

3. Build the project:
```bash
cmake --build .
```

## Running the Game

After building, you can run the game from the build directory:
```bash
./PlatformerEngine
```

## Project Structure

- `src/`: Source files
  - `main.cpp`: Main game loop
  - `Player.cpp`: Player class implementation
  - `Level.cpp`: Level class implementation
- `include/`: Header files
  - `Player.hpp`: Player class declaration
  - `Level.hpp`: Level class declaration
- `CMakeLists.txt`: CMake build configuration 