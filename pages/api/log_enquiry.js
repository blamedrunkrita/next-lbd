import { connectToDatabase } from "../../util/mongodb.js"

export default async function handler(req, res) {
  const { db } = await connectToDatabase()

  if (req.method === "POST") {
    let newData = JSON.parse(req.body).payload
    console.log("NEW DATA", newData)
    //handle ID
    await db.collection("enquiries").insertOne(newData)
    res.status(200).json(newData)
    console.log(`Item Uploaded`)
  } else {
    res.status(400).message("Not Found")
  }
}
