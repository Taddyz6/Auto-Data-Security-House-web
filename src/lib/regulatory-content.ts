export type RegulationItem = {
  title: string;
  authority: string;
  publishedAt: string;
  sourceUrl: string;
};

export type NegativeListItem = {
  region: string;
  version: string;
  publishedAt: string;
  sourceUrl: string;
};

export const regulationItems: readonly RegulationItem[] = [
  {
    title: "汽车数据出境安全指引（2026版）",
    authority: "工业和信息化部等八部门",
    publishedAt: "2026-02-03",
    sourceUrl: "https://www.cac.gov.cn/2026-02/03/c_1771851453192164.htm",
  },
  {
    title: "个人信息出境认证办法",
    authority: "国家网信办、市场监管总局",
    publishedAt: "2025-10-17",
    sourceUrl: "https://www.cac.gov.cn/2025-10/17/c_1762449728720008.htm",
  },
  {
    title: "网络数据安全管理条例",
    authority: "国务院",
    publishedAt: "2024-09-24",
    sourceUrl: "https://xzfg.moj.gov.cn/front/law/detail?LawID=1734&Query=",
  },
  {
    title: "促进和规范数据跨境流动规定",
    authority: "国家网信办",
    publishedAt: "2024-03-22",
    sourceUrl: "https://www.cac.gov.cn/2024-03/22/c_1712776612187994.htm",
  },
  {
    title: "个人信息出境标准合同办法",
    authority: "国家网信办",
    publishedAt: "2023-02-24",
    sourceUrl: "https://www.cac.gov.cn/2023-02/24/c_1678884830036813.htm",
  },
  {
    title: "数据出境安全评估办法",
    authority: "国家网信办",
    publishedAt: "2022-07-07",
    sourceUrl: "https://www.cac.gov.cn/2022-07/07/c_1658811536396503.htm",
  },
  {
    title: "汽车数据安全管理若干规定（试行）",
    authority: "国家网信办等五部门",
    publishedAt: "2021-08-20",
    sourceUrl: "https://www.cac.gov.cn/2021-08/20/c_1631049984897667.htm",
  },
  {
    title: "中华人民共和国个人信息保护法",
    authority: "全国人大常委会",
    publishedAt: "2021-08-20",
    sourceUrl:
      "https://www.samr.gov.cn/wljys/gzzd/art/2023/art_3ef1e889c1e644d4b65b5f5c7f432386.html",
  },
];

const negativeListTopicUrl =
  "https://www.cac.gov.cn/wxzw/sjzl/sjcjfmqd/A09370806index_1.htm";

export const negativeListItems: readonly NegativeListItem[] = [
  {
    region: "广东",
    version: "2025版",
    publishedAt: "2026-05-18",
    sourceUrl: negativeListTopicUrl,
  },
  {
    region: "北京",
    version: "2025版",
    publishedAt: "2026-05-11",
    sourceUrl: negativeListTopicUrl,
  },
  {
    region: "上海",
    version: "2025版",
    publishedAt: "2026-04-29",
    sourceUrl: negativeListTopicUrl,
  },
  {
    region: "福建",
    version: "2025版",
    publishedAt: "2025-12-25",
    sourceUrl: negativeListTopicUrl,
  },
  {
    region: "广西",
    version: "2025版",
    publishedAt: "2025-09-05",
    sourceUrl: negativeListTopicUrl,
  },
  {
    region: "江苏",
    version: "2025版",
    publishedAt: "2025-09-05",
    sourceUrl: negativeListTopicUrl,
  },
  {
    region: "重庆",
    version: "2025版",
    publishedAt: "2025-09-05",
    sourceUrl: negativeListTopicUrl,
  },
  {
    region: "浙江",
    version: "2024版",
    publishedAt: "2025-04-10",
    sourceUrl: negativeListTopicUrl,
  },
  {
    region: "海南",
    version: "2024版",
    publishedAt: "2025-02-20",
    sourceUrl: negativeListTopicUrl,
  },
  {
    region: "天津",
    version: "2024版",
    publishedAt: "2024-05-09",
    sourceUrl: negativeListTopicUrl,
  },
];
