const flowModel=require('../models/flowModel')
//on saving user flow!
exports.addFlow=async(req,res)=>{
    const userID=req.userID
    const {nodes,edges}=req.body
    try {
        let flow=await flowModel.findOne({userID})
        if(flow){
            flow.nodes = nodes;
            flow.edges = edges;
            await flow.save()
        }else{
            const newflow = new flowModel({ userID, nodes, edges });
             await newflow.save();
        }
        res.status(200).json({ message: 'Flow saved successfully'});
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
}

//on fetching user flow
exports.getFlow=async(req,res)=>{
    const userID=req.userID
    try {
        const findFlow=await flowModel.findOne({userID:userID})
        res.status(200).json({flow:findFlow?findFlow:[]})
    } catch (error) {
        res.status(500).json(error)
    }
}