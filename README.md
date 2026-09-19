# WebSocket Demo

A lightweight demonstration of real-time, bidirectional client-server communication using Node.js and WebSockets, containerized with Docker.

---

## Features

- **Real-Time Communication:** Instant full-duplex messaging between the server and the connected client.
- **Connection Management:** Modular connection logic organized in a dedicated module.
- **Containerized Environment:** Ready to run anywhere using Docker Compose.
- **Static Client:** A simple HTML frontend to send and receive messages.

---

## Tech Stack

- **Runtime:** Node.js
- **Frontend:** HTML5 / JavaScript
- **DevOps:** Docker & Docker Compose

---

## Project Structure

```text
├── connection.js       # WebSocket connection management
├── docker-compose.yml  # Docker multi-container service definition
├── index.html          # Web client interface
├── package.json        # Dependencies and project metadata
├── server.js           # Main Node.js server entry point
└── .gitignore          # Excluded files and folders
