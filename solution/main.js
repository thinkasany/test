const fs = require('fs');

// 生成随机整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成随机 JSON 数据
function generateRandomData() {
  const data = {
    name: 'John Doe',
    age: getRandomInt(18, 65),
  };

  return JSON.stringify(data, null, 2);
}

// 保存 JSON 数据到文件
function saveJsonToFile(data, filename) {
  fs.writeFileSync(filename, data, 'utf8');
  console.log(`JSON data saved to ${filename}`);
}

// 生成随机 JSON 数据并保存到文件
const randomData = generateRandomData();
const outputFilename = 'random_data.json';
saveJsonToFile(randomData, outputFilename);
