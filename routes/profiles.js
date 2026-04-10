const express = require('express');
const auth = require('../middleware/auth');
let profiles = require('../data/profiles');

const router = express.Router();

// Get all profiles
/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Get all profiles (paginated + search)
 *     tags: [Profiles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 12
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: john
 *     responses:
 *       200:
 *         description: Paginated profiles with search
 */
router.get('/', auth, (req, res) => {
  let { page = 1, limit = 12, search = '' } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);
  search = search.toLowerCase();

  if (page < 1) page = 1;
  if (limit < 1) limit = 12;

  // Filter profiles based on search
  let filteredProfiles = profiles.filter(p =>
    p.name.toLowerCase().includes(search) ||
    p.email.toLowerCase().includes(search) ||
    p.phone?.toLowerCase().includes(search)
  );

  const total = filteredProfiles.length;
  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedData = filteredProfiles.slice(startIndex, endIndex);

  res.json({
    message: true,
    page,
    limit,
    has_prev: page > 1,
    has_next: page < totalPages,
    total,
    total_pages: totalPages,
    data: paginatedData,
  });
});

// Get single profile
/**
 * @swagger
 * /api/profiles/{id}:
 *   get:
 *     summary: Get profile by ID
 *     tags: [Profiles]
 */
router.get('/:id', auth, (req, res) => {
  const profile = profiles.find(p => p.id === req.params.id);
  if (!profile) return res.status(404).json({ msg: 'Profile not found' });
  res.json(profile);
});

// Create profile
/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - address
 *               - dob
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               address:
 *                 type: string
 *                 example: 123 Main St, City, Country
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *     responses:
 *       200:
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     dob:
 *                       type: string
 *                       format: date
 */
router.post('/', auth, (req, res) => {
  const { name, email, phone, address, dob } = req.body;

  // Basic validation
  if (!name || !email || !phone || !address || !dob) {
    return res.status(400).json({ message: false, msg: 'All fields are required' });
  }

  const newProfile = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    address,
    dob,
  };

  profiles.push(newProfile);

  // Return in proper format
  res.json({
    message: "Profile created successfully",
    data: newProfile,
  });
});

// Update profile
/**
 * @swagger
 * /api/profiles/{id}:
 *   put:
 *     summary: Update a profile by ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 1680012345678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               address:
 *                 type: string
 *                 example: 123 Main St, City, Country
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 */
router.put('/:id', auth, (req, res) => {
  const index = profiles.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: false, msg: 'Profile not found' });
  }

  const { name, email, phone, address, dob } = req.body;

  // Update only provided fields
  profiles[index] = {
    ...profiles[index],
    ...(name && { name }),
    ...(email && { email }),
    ...(phone && { phone }),
    ...(address && { address }),
    ...(dob && { dob }),
  };

  res.json({
    message: true,
    data: profiles[index],
  });
});

// Delete profile
/**
 * @swagger
 * /api/profiles/{id}:
 *   delete:
 *     summary: Delete a profile by ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 1680012345678
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: string
 *                   example: Profile deleted
 */
router.delete('/:id', auth, (req, res) => {
  const index = profiles.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: false, msg: 'Profile not found' });
  }

  profiles.splice(index, 1);

  res.json({
    message: true,
    data: 'Profile deleted',
  });
});

module.exports = router;