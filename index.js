import express from "express";
import fs from "fs";


const port = 3000;
const app = express();
const jsonExpress = express.json();
let memberContain = JSON.parse(
  fs.readFileSync("./member contain.json", "utf8")
);
let trainerContain = JSON.parse(
  fs.readFileSync("./trainer contain.json", "utf8")
);

//Get all revenues of all members.
app.get("/getallmember", (req, res, next) => {
  let result = 0;
  for (let i = 0; i < memberContain.length; i++) {
    result += memberContain[i].membership.cost;
  }
  res.status(200).json(result);
});
//Get the revenues of a specific trainer.
app.get("/alltrainer/:id", (req, res) => {
  let result = 0;
  for (let i = 0; i < memberContain.length; i++) {
    if (memberContain[i].trainerId == req.params.id) {
      console.log(req.params.id);
      result += memberContain[i].membership.cost;
    }
  }
  res.status(200).json(result);
});

//Add member
app.post("/member", jsonExpress, (req, res) => {
  req.body.id = memberContain.length + 1;

  const isAlreadyExist = memberContain.findIndex((member) => {
    return member.nationalId == req.body.nationalId;
  });
  if (isAlreadyExist != -1) {
    res.status(409).json({ message: "Is Already Exist" });
  }
  memberContain.push(req.body);
  fs.writeFileSync("member contain.json", JSON.stringify(memberContain));
  res.status(201).json({ message: "added", data: req.body });
});
//Get all Members and Member’s Trainer
app.get("/allmember", (req, res) => {
  let allMember = memberContain.map((member) => {
    let AllTrainer = trainerContain.find((trainer) => {
      return trainer.trainerId == member.trainerId;
    });
    return {
      ...member,
      Trainer: AllTrainer,
    };
  });

  res.status(200).json(allMember);
});
//Get a specific Member (if his membership expired return “this member is not allowed to enter the gym”)
app.get("/member/:id", (req, res) => {
  let id = req.params.id;

  let member = memberContain.find((member) => {
    return member.id == id;
  });
  if (new Date(member.membership.to) < new Date()) {
    res.json({ message: "this member is not allowed to enter the gym" });
  } else {
    res.json({ message: "User Allowed", data: member });
  }
});
//Update Member (name, membership, trainer id)
app.put("/member/:userId", jsonExpress, (req, res) => {
  let { name, membership, trainerId } = req.body;
  let { userId } = req.params;

  let index = memberContain.findIndex((member) => {
    return member.id == userId;
  });
  if (index == -1) {
    return res.status(409).json({ message: "Invaild userID", success: false });
  }
  let updateUser = {
    name: name ? name : memberContain[index].name,
    membership: membership ? membership : memberContain[index].membership.from,
    membership: membership ? membership : memberContain[index].membership.to,
    membership: membership ? membership : memberContain[index].membership.cost,
    trainerId: trainerId ? trainerId : memberContain[index].trainerId,
  };
  memberContain[index] = updateUser;
  fs.writeFileSync("member contain.json", JSON.stringify(memberContain));
  res
    .status(200)
    .json({ message: "Updated ", data: memberContain[index], success: true });
});

//member delete
app.delete("/member/:userId",  (req, res) => {

  let { userId } = req.params;

  let index = memberContain.findIndex((member) => {
    return member.id == userId;
  });
  if (index == -1) {
    return res.status(409).json({ message: "Invaild userID", success: false });
  }
  console.log(userId);
  memberContain.splice(index,1);
  fs.writeFileSync("member contain.json", JSON.stringify(memberContain));
  res.status(200).json({ message: "Deleted ", success: true });
});
//add trainer
app.post("/trainer", jsonExpress, (req, res) => {
    
  
    const isAlreadyExist = trainerContain.findIndex((trainer) => {
      return trainer.name == req.body.name;
    });
    if (isAlreadyExist != -1) {
      res.status(409).json({ message: "Is Already Exist" });
    }
    trainerContain.push(req.body);
    fs.writeFileSync("trainer contain.json", JSON.stringify(trainerContain));
    res.status(201).json({ message: "added", data: req.body });
  });
  // Get all trainer
 app.get("/alltrainer", (req, res) => {
    let allTrainer = trainerContain.map((trainer) => {
      let AllMember = memberContain.find((member) => {
        return member.trainerId == trainer.trainerId;
      });
      return {
        ...trainer,
        member: AllMember,
      };
    });
  
    res.status(200).json(allTrainer);
  });
  //update trainer
  app.put("/trainer/:trainerId", jsonExpress, (req, res) => {
    let { name, duration, trainerId } = req.body;
    let { trainerIdUser } = req.params;
  
    let index = trainerContain.findIndex((trainer) => {
      return trainer.trainerIdUser == trainerIdUser;
    });
    if (index == -1) {
      return res.status(409).json({ message: "Invaild userID", success: false });
    }
    let updateUser = {
      name: name ? name : trainerContain[index].name,
      duration: duration ? duration : trainerContain[index].duration.from,
      duration: duration ? duration : trainerContain[index].duration.to,
      duration: duration ? duration : trainerContain[index].duration.cost,
      trainerId: trainerId ? trainerId : trainerContain[index].trainerId,
    };
    trainerContain[index] = updateUser;
    fs.writeFileSync("trainer contain.json", JSON.stringify(trainerContain));
    res
      .status(200)
      .json({ message: "Updated ", data: trainerContain[index], success: true });
  });
  //delete trainer
  app.delete("/trainer/:userId",  (req, res) => {

    let { trainerIdUser } = req.params;
  
    let index = trainerContain.findIndex((trainer) => {
      return trainer.trainerIdUser == trainerIdUser;
    });
    if (index == -1) {
      return res.status(409).json({ message: "Invaild trainerIdUser", success: false });
    }
    console.log(trainerIdUser);
    trainerContain.splice(index,1);
    fs.writeFileSync("trainer contain.json", JSON.stringify(trainerContain));
    res.status(200).json({ message: "Deleted ", success: true });
  });
//Get a specific trainer and trainer’s members
app.get('/gettrainer/:id',(req,res)=>{
  let {id} =req.params
  let trainer = trainerContain.find((trainer)=>{
    return trainer.trainerId == id
  })
  let member = memberContain.filter((member)=>{
    return member.trainerId == id
  })
  if(trainer == -1){
    res.status(404).json({message:"Not Found"})
  }
  
  res.status(200).json({message : "success" , trainer ,member})
})
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found " });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
