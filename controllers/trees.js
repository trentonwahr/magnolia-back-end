import { Profile } from "../models/profile.js"
import { FamilyTree } from "../models/tree.js"
import { FamilyRecipe } from "../models/recipe.js"

async function create(req, res) {
  try {
    req.body.creator = req.user.profile
    const tree = await FamilyTree.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { familyTree: tree } },
      { new: true }
    )
    tree.creator = profile
    res.status(201).json(tree)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const tree = await FamilyTree.findById(req.params.treeId)
      .populate('creator')
    res.status(200).json(tree)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const tree = await FamilyTree.findByIdAndUpdate(
      req.params.treeId,
      req.body,
      { new: true }
    ).populate('creator')
    res.status(200).json(tree)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteTree(req, res) {
  try {
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function createMember(req, res) {
  try {
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export { 
  create,
  show,
  update,
  deleteTree as delete,
  createMember,
}