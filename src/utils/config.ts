import fs from "fs";
import path from "path";
import yaml from "yaml";

// 读取项目根目录下的config.yml文件
const configPath = path.resolve(process.cwd(), "config.yml");
const configContent = fs.readFileSync(configPath, "utf8");

// 解析YAML内容并导出配置对象
export const config = yaml.parse(configContent);
