import { Creapods, Category } from "./index.js"

// const services = {
//   webflow: {
//     sites: 'sites/631f588d6b154003d697b500/collections',
//     apiKey: 'qsdf', //process.env.WEBFLOW_API_KEY,
//   },
// }

const client = new Creapods({
  // baseUrl: "http://localhost:3000/api/creapods/", // with BlitzJS
  // baseUrl: "https://api.webflow.com/", // with webflow, withour BlitzJS
    apiKey: 'sdfd',
})

const room = client.createRoom({
  id: 'room1',
  name: 'room1',
  location: 'location1',
  description: 'description1',
})

room.addGroup({
  id: 'group1',
  name: 'pods 3D',
  category: Category.Create3D,
})

room.display()

async function getAllRooms() {
  return await client.getTest()
}

getAllRooms()
