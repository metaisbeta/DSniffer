import * as fs from "fs";
import * as path from "path";
import { DSniffer } from "./DSniffer"
import { DirectoryModel } from "./models/DirectoryModel"
import { Metrics } from "./models/MetricsModel"
const projectsPath = path.join(__dirname, "../projects");


fs.readdirSync(projectsPath).forEach(project => {
    console.log(`Analisando projeto ${project}`)
    const dSniffer = new DSniffer()
    const projectPath = path.join(projectsPath, project)
    const directories = dSniffer.execute(projectPath)
    getMetrics(directories, project)
})


function getMetrics(directories: DirectoryModel[], project: string){
    const metric = new Metrics(project)
    directories.forEach(directory => {
        metric.getMetrics(directory)
    })
    metric.exportJson()
}