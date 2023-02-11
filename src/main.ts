import * as fs from "fs";
import * as path from "path";
import { DSniffer } from "./DSniffer"

const projectsPath = path.join(__dirname, "../projects");

const dSniffer = new DSniffer()
fs.readdirSync(projectsPath).forEach(project => {
    console.log(`Analisando projeto ${project}`)
    const projectPath = path.join(projectsPath, project)
    const files = dSniffer.execute(projectPath)
})

