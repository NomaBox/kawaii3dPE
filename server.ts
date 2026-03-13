import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import AdmZip from "adm-zip";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route for the "Installer" download
  app.get("/api/download-installer", (req, res) => {
    try {
      const zip = new AdmZip();
      
      // Add a mock executable (just a text file for demo)
      zip.addFile("KawaiiPets_Setup.exe", Buffer.from("This is a simulated installer for Kawaii 3D Pets.\nIn a real scenario, this would be a Windows/Mac executable."));
      
      // Add a README
      zip.addFile("LEEME.txt", Buffer.from("¡Gracias por adoptar una mascota Kawaii!\n\nInstrucciones:\n1. Ejecuta KawaiiPets_Setup.exe\n2. Elige tu mascota en la tienda web.\n3. ¡Disfruta de tu compañero en el escritorio!"));
      
      const zipBuffer = zip.toBuffer();
      
      res.set({
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=KawaiiPets_Installer.zip",
        "Content-Length": zipBuffer.length,
      });
      
      res.send(zipBuffer);
    } catch (error) {
      console.error("Error generating zip:", error);
      res.status(500).send("Error generating installer");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
