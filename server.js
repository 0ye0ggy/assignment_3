const express = require('express');
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use(express.json()); // To parse JSON bodies
const items = []; // In-memory storage for simplicity

// CREATE (POST /items)
app.post('/items', (req, res) => {
  const item = req.body; // Assume JSON body with item data
  items.push(item);
  res.status(201).send(item);
});

// READ (GET /items)
app.get('/items', (req, res) => {
  res.send(items);
});

// READ (GET /items/:id)
app.get('/items/:id', (req, res) => {
  const item = items.find((i) => i.id === req.params.id);
  if (item) {
    res.send(item);
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
});

// UPDATE (PUT /items/:id)
app.put('/items/:id', (req, res) => {
  const index = items.findIndex((i) => i.id === req.params.id);
  if (index !== -1) {
    const updatedItem = { ...items[index], ...req.body };
    items[index] = updatedItem;
    res.send(updatedItem);
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
});

// DELETE (DELETE /items/:id)
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex((i) => i.id === req.params.id);
  if (index !== -1) {
    items.splice(index, 1);
    res.status(204).send(); // No content
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
});


