const puppeteer = require("puppeteer");
const contributors = require("./data2.json");
// 头像URL数组
const avatars = contributors.map(i => i.avatar);
console.log(avatars);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const customStyle = `
    .custom {
        width: 60px;
        height: 60px;
        margin: 1px 1px;
        border-radius: 50%;
    }
`;
  // 创建一个HTML字符串，其中包含多个图片
  // const htmlContent = avatars.map((avatarUrl) => `<img src="${avatarUrl}" class="custom" />`).join('');
  const htmlContent = `
    <style>${customStyle}</style>
    ${avatars
      .map(avatarUrl => `<img src="${avatarUrl}" class="custom" />`)
      .join("")}
`;

  // 设置页面内容
  await page.setContent(htmlContent);

  // 等待加载所有图片
  await page.waitForSelector("img");

  // 修改容器的尺寸和样式
  await page.evaluate(() => {
    const container = document.body; // 或者选择包含所有图片的父元素
    container.style.width = "890px";
    // container.style.margin = "0 auto"; // 可以居中容器
  });

  // 获取包含所有图片的容器的尺寸
  const containerSize = await page.evaluate(() => {
    const container = document.body;
    const rect = container.getBoundingClientRect();
    return { width: rect.width, height: rect.height + 10 };
  });

  // 设置页面尺寸以适应容器
  await page.setViewport(containerSize);

  // 截取整个页面，包括所有图片
  await page.screenshot({ path: "contributors2.png" });

  await browser.close();
  console.log("PNG文件已保存");
})();
