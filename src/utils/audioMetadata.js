import { parseFile } from "music-metadata";
import fetch from "node-fetch";
import { createWriteStream } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { unlink } from "fs/promises";

// 从远程URL获取音频时长
export async function getAudioDurationFromUrl(audioUrl) {
  try {
    // 创建临时文件
    const tempFilePath = join(tmpdir(), `temp-audio-${Date.now()}.mp3`);
    const response = await fetch(audioUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }

    // 保存远程音频到临时文件
    const fileStream = createWriteStream(tempFilePath);
    await new Promise((resolve, reject) => {
      response.body.pipe(fileStream);
      fileStream.on("finish", resolve);
      fileStream.on("error", reject);
    });

    // 解析音频元数据
    const metadata = await parseFile(tempFilePath);
    const duration = metadata.format.duration;

    // 删除临时文件
    await unlink(tempFilePath);

    // 格式化时长为分:秒格式
    if (duration) {
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }

    return "未知时长";
  } catch (error) {
    console.error("Error getting audio duration:", error);
    return "获取失败";
  }
}
