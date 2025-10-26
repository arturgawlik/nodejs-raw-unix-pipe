
cmake_minimum_required(VERSION 3.31)
cmake_policy(SET CMP0042 NEW)
set(CMAKE_CXX_STANDARD 20)

# just for debugging purposes e.g. cmake_print_variables
include(CMakePrintHelpers)

project (nodejs-raw-unix-pipe)

# generate compile_commands.json
SET(CMAKE_EXPORT_COMPILE_COMMANDS on)

# define NAPI_VERSION
add_definitions(-DNAPI_VERSION=10)

include_directories(${CMAKE_JS_INC})

set(HEADER_FILES
  "main.h"
)
set(SOURCE_FILES
  "main.cc"
)

add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${HEADER_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

# link cmake-js
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})

# include Node-API wrappers
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
string(REGEX REPLACE "[\r\n\"]" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})

execute_process(COMMAND node -p "require('node:path').join(process.execPath, '../../include/node/')"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_INCLUDE_DIR
        )
string(REGEX REPLACE "[\r\n\"]" "" NODE_INCLUDE_DIR ${NODE_INCLUDE_DIR})

target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})
target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_INCLUDE_DIR})

cmake_print_variables(NODE_ADDON_API_DIR)
cmake_print_variables(NODE_INCLUDE_DIR)
        
#move compile_commands.json to root catalog to make it visible for clangd
execute_process(COMMAND mv ${CMAKE_CURRENT_BINARY_DIR}/compile_commands.json ./compile_commands.json
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        )
