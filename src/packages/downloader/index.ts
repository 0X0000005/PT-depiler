import { AbstractBittorrentClient, type DownloaderBaseConfig, type TorrentClientMetaData } from "./types";
import { cloneDeep } from "es-toolkit";

export * from "./types";
export { getRemoteTorrentFile } from "./utils";

interface downloaderEntity {
  default: AbstractBittorrentClient;
  clientConfig: DownloaderBaseConfig;
  clientMetaData: TorrentClientMetaData;
}

export const requireContext = import.meta.glob<downloaderEntity>("./entity/*.ts");
export const entityList = Object.keys(requireContext).map((value: string) => {
  return value.replace(/^\.\/entity\//, "").replace(/\.ts$/, "");
}) as string[];

// 从 requireContext 中获取对应模块
export async function getDownloaderModule(configType: string): Promise<downloaderEntity> {
  return await requireContext[`./entity/${configType}.ts`]();
}

export async function getDownloaderDefaultConfig(type: string): Promise<DownloaderBaseConfig> {
  const config = cloneDeep((await getDownloaderModule(type)).clientConfig);
  // 填入/覆盖 缺失项
  config.feature ??= {};
  config.feature.DefaultAutoStart ??= false;

  return config;
}

export async function getDownloaderMetaData(type: string): Promise<TorrentClientMetaData> {
  return cloneDeep((await getDownloaderModule(type)).clientMetaData);
}

export async function getDownloader(config: DownloaderBaseConfig): Promise<AbstractBittorrentClient> {
  const DownloaderClass = (await getDownloaderModule(config.type)).default;

  // @ts-ignore
  return new DownloaderClass(config);
}

export function getDownloaderIcon(type: string) {
  return `/icons/downloader/${type}.png`;
}
