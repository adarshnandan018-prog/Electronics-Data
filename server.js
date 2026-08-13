const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/submit', (req, res) => {
  const { name, branch, ent } = req.body;

  if (!name || !branch || !ent) {
    return res.status(400).send('<h1>Missing required fields</h1><p>Please complete the form.</p>');
  }

  console.log('Received submission:', { name, branch, ent });

  res.send(`
    <h1>Submission Received</h1>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Branch:</strong> ${escapeHtml(branch)}</p>
    <p><strong>ENT:</strong> ${escapeHtml(ent)}</p>
    <p><a href="/">Return to form</a></p>
  `);
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
