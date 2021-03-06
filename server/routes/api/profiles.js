const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const router = Router();
const isEmpty = require("../../utils/isEmpty");
const Profile = require("../../models/Profile");
const auth = require("../../routes/middleware/auth");

const profileValidator = [
  check("fName", "First Name is required.").not().isEmpty(),
  check("lName", "Last Name is required.").not().isEmpty(),
  check("name", "Name is required.").not().isEmpty(),
  check("githubUrl", "Invalid URL.").optional().isURL(),
  check("twitterUrl", "Invalid URL.").optional().isURL(),
  check("youtubeUrl", "Invalid URl.").optional().isURL(),
  check("email", "Invalid Email").isEmail(),
];

// @route     GET '/api/profiles/all'
// @desc      Return all users profiles.
// @access    Private -> Registered users
router.get("/all", auth, async (req, res) => {
  try {
    const profiles = await Profile.find();
    return res.status(200).json({ profiles });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: error.message } });
  }
});

// @route     GET '/api/profiles/:id'
// @desc      Return user's profile by id.
// @access    Private -> Registered users
router.get("/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    return res.status(200).json({ profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: error.message } });
  }
});

// @route     POST '/api/profiles'
// @desc      New Profile.
// @access    Private -> Registered users.
router.post("/", profileValidator, async (req, res) => {
  const vResult = validationResult(req);
  if (isEmpty(vResult)) {
    return res.status(400).json(vResult);
  }
  try {
    const profile = await Profile.create(req.body);

    if (isEmpty(profile)) {
      return res
        .status(400)
        .json({ errors: { message: "First & last name is required." } });
    }

    return res.status(201).json({ profile });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: { message: error.message } });
  }
});

// @route     PUT '/api/profiles'
// @desc      Update Profile.
// @access    Private -> Registered users.
router.put("/", auth, profileValidator, async (req, res) => {
  const vResult = validationResult(req);
  if (isEmpty(vResult)) return res.status(400).json(vResult);
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: { ...req.body } },
      { new: true }
    );
    if (!updatedProfile) {
      res.status(400).json({ msg: "Bad request." });
    }
    res.status(201).json(updatedProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: { message: error.message } });
  }
});

// @route     DELETE '/api/profiles'
// @desc      New Profile.
// @access    Private -> Registered users.
router.delete("/", profileValidator, async (req, res) => {
  const vResult = validationResult(req);
  if (isEmpty(vResult)) return res.status(400).json(vResult);
  try {
    const profile = await Profile.findOneAndRemove({ user: req.user.id });

    if (isEmpty(profile)) {
      return res.status(400).json({ errors: { message: "No Profile found" } });
    }

    return res.status(201).json({ msg: "Profile deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: { message: error.message } });
  }
});

module.exports = router;

// Class Version. (Allready did this part see "/self")

// @route     GET '/api/profiles'
// @desc      Get single profile w/ user ID.
// @access    Private -> Registered users.

// router.get("/", auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user.id });
//     res.json(profile);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Server Error." });
//   }
// });
