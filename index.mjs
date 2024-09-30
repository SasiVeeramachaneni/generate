// index.mjs
import express from 'express';
import { generateVueFiles, exportSlidevPPTX, sendEmail } from './generateVueFile.mjs';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-vue', async (req, res) => {
  try {
    const jsonData = req.body;
    await generateVueFiles(jsonData);
    res.status(200).send('Vue file generated successfully!');

    // Run slidev export command and send email sequentially
    await exportSlidevPPTX();
    await sendEmail('/Users/veers2/Desktop/generate/slides-export.pptx');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating Vue file or sending email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
