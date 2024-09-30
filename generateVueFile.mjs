// generateVue.mjs
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import nodemailer from 'nodemailer';

export async function generateVueFiles(jsonData) {

    //Create a slides.md from template.md
    // Define the source and destination file paths
    const sourceFilePath = path.join('/Users/veers2/Desktop/generate', 'template.md');
    const destinationFilePath = path.join('/Users/veers2/Desktop/generate', 'slides.md');

    // Copy the file
    fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
    if (err) {
        console.error('Error copying the file:', err);
    } else {
        console.log('File copied successfully!');
    }
    });


  // Transform JSON data into the required structures
  const providerApplications = jsonData.flatMap(item => 
    item.Applications.map(app => ({
      ProviderLabel: item.ProviderLabel,
      PSM: item.PSM,
      ApplicationName: app.Label,
      ApplicationHealth: app.AppHealth,
      ApplicationDescription: app.AppDescription,
      NoOfLiveSubscribers: app.NoOfLiveSubscribers,
      DevCompletionPercentage: app.DevCompletionPercentage
    }))
  );

  const psmProviders = jsonData.reduce((acc, item) => {
    let psm = acc.find(p => p.PSM === item.PSM);
    if (!psm) {
      psm = { PSM: item.PSM, Providers: [] };
      acc.push(psm);
    }
    psm.Providers.push(item.ProviderLabel);
    return acc;
  }, []);

//Generate the file for PSMs


    const vuePSMTemplate = `
<template>
  <div class="psm-container">
    <div v-for="psm in psms" :key="psm.PSM" class="psm-card">
      <h6 class="psm-name">{{ psm.PSM }}</h6>
      <ul>
        <li v-for="provider in psm.Providers" :key="provider" class="provider-name">{{ provider }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      psms: ${JSON.stringify(psmProviders)}
    };
  }
};
</script>

<style scoped>
.psm-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  padding: 2px;
}

.psm-card {
  padding: 3px;
}

.psm-name {
  margin: 0 0 2px;
  border: 1.5px solid black;
  background-color: silver; /* Add grey background color */
  padding: 2px;
}

.provider-name {
  margin: 0px 0;
  border: 1px solid black;
  padding: 2px;
  font-size: 8px; /* Define the font size for provider names here */
}

.psm-card ul {
  list-style-type: none;
  padding: 0;
}
</style>

`;


    // Define the output directory
    const outputDir = '/Users/veers2/Desktop/generate/components';

    // Ensure the directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Write the Vue file
    const vueFileName = `PSM.vue`;
    const vueFilePath = path.join(outputDir, vueFileName);
    fs.writeFileSync(vueFilePath, vuePSMTemplate, 'utf8');

    console.log(`Vue file ${vueFileName} generated successfully!`);
    var updatedVueFileName = vueFileName.replace('.vue','');


    // Append text to slides.md
    const slidesFilePath = '/Users/veers2/Desktop/generate/slides.md';
    const appendText = `---\n\n<div>\n\t<${updatedVueFileName} />\n</div>\n`;
    fs.appendFileSync(slidesFilePath, appendText, 'utf8');

    console.log(`Appended text to slides.md for ${vueFileName}`);
  


//Generate the file for Applications
  // Group applications into chunks of 4
  const chunkSize = 4;
  for (let i = 0; i < providerApplications.length; i += chunkSize) {
    const chunk = providerApplications.slice(i, i + chunkSize);

    const vueAppTemplate = `
<template>
  <div>
    <h3>Application List</h3>
        <ApplicationTable :applications="applications" />   
    </div>
</template>

<script>
import ApplicationTable from '../ApplicationTable.vue';

export default {
    name: 'App',
    components: {
        ApplicationTable
    },
    data() {
        return {
            applications: ${JSON.stringify(chunk, null, 4)}
        };
    }
};
</script>

<style>
 h3 {
    padding: 2px;
  }
</style>
`;


    // Define the output directory
    const outputDir = '/Users/veers2/Desktop/generate/components';

    // Ensure the directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Write the Vue file
    const vueFileName = `App_${Math.floor(i / chunkSize) + 1}.vue`;
    const vueFilePath = path.join(outputDir, vueFileName);
    fs.writeFileSync(vueFilePath, vueAppTemplate, 'utf8');

    console.log(`Vue file ${vueFileName} generated successfully!`);
    var updatedVueFileName = vueFileName.replace('.vue','');


    // Append text to slides.md
    const slidesFilePath = '/Users/veers2/Desktop/generate/slides.md';
    const appendText = `---\n\n<div>\n\t<${updatedVueFileName} />\n</div>\n`;
    fs.appendFileSync(slidesFilePath, appendText, 'utf8');

    console.log(`Appended text to slides.md for ${vueFileName}`);
  }


  // Optionally, save the transformed JSON data to files
  //fs.writeFileSync('/Users/veers2/Desktop/generate/providerApplications.json', JSON.stringify(providerApplications, null, 2), 'utf8');
  //fs.writeFileSync('/Users/veers2/Desktop/generate/psmProviders.json', JSON.stringify(psmProviders, null, 2), 'utf8');
}

export async function exportSlidevPPTX() {
  return new Promise((resolve, reject) => {
    exec('slidev export --format pptx', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error exporting Slidev PPTX: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Slidev export stderr: ${stderr}`);
        return reject(new Error(stderr));
      }
      console.log(`Slidev export stdout: ${stdout}`);
      resolve();
    });
  });
}

export async function sendEmail(filePath) {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'listenermails@gmail.com', // Your Gmail address
      pass: 'eqsz psmo kefz tfpn' // Your Gmail app password
    }
  });

  // Email options
  let mailOptions = {
    from: 'listenermails@gmail.com',
    to: 'listenermails@gmail.com',
    subject: 'Generated Slidev PPTX File',
    text: 'Please find the attached Slidev PPTX file.',
    attachments: [
      {
        filename: 'slides-export.pptx',
        path: filePath
      }
    ]
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
