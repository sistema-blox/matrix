import fs from "fs";
import uuid from "uuid/v4";
import path from "path";

const roomFilePath = "../file/matrix.room.web.json";

const fetchFromFile = () => {
  const roomFileExists = fs.existsSync(roomFilePath);
  if (!roomFileExists) {
    createRoomFileSync();
  }

  const roomsData = fs.readFileSync(roomFilePath);
  const roomsDetail = JSON.parse(roomsData);

  return new Promise((resolve) => resolve(roomsDetail));
};

const createRoomFileSync = () => {
  const roomsData = [];

  roomsData[0] = {
    id: uuid(),
    name: "The Dock",
    disableMeeting: true,
  };

  const roomNames = [
    "Papo de Buteco",
    "Sala de Treinamentos",
    "Sala Comercial",
    "Sala de Setup Pedagógico",
    "Sala de Desenvolvimento",
    "Sala de Produto",
  ];

  const bloxRoom = [
    {
      header_color: "#4EB585",
      blox_color: '#56D59A'
    }
    {
      header_color: "#2196F3",
      blox_color: '#2380C1'
    }
    {
      header_color: "#EA8B68",
      blox_color: '#D66C45'
    }
    {
      header_color: "#2196F3",
      blox_color: '#13628E'
    }
    {
      header_color: "#D82E60",
      blox_color: '#B4254F'
    }
    {
      header_color: "#4D4595",
      blox_color: '#1F39D8'
    }
  ]

  for (const roomName of roomNames) {
    roomsData.push({
      id: uuid(),
      name: roomName,
      header_color: bloxRoom.header_color,
      blox_color: bloxRoom.blox_color,
    });
  }

  fs.mkdirSync(path.dirname(roomFilePath), { recursive: true });
  fs.writeFileSync(roomFilePath, JSON.stringify(roomsData));
};

const fetchFromEnvironment = (env) => {
  const roomsData = env.ROOMS_DATA;
  const roomsDetail = JSON.parse(roomsData);

  return new Promise((resolve) => resolve(roomsDetail));
};

const fetchRooms = (strategy) => {
  switch (strategy) {
    // TODO add suport to fetch from endpoint
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);
    default:
      return fetchFromFile();
  }
};

export default fetchRooms;
