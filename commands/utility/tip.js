const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tip')
        .setDescription('팁과 노하우 게시판 최상단 컨텐츠를 가져옵니다.'),
    async execute(interaction) {
        getContents( data => interaction.reply(data) )
    },
};

function getContents(callback) {
    axios({
        method: "get",
        url: `https://www.inven.co.kr/board/maple/2304`,
        data: {}
    })
    .catch(function (err) {
        console.log(err); // 에러 처리 내용
    })
    .then(function (response) {
        const $ = cheerio.load(response.data);
        const row = $('.subject-link')[3];

        let result = "";
        result += `[${$(row).text().replace(/\[.*\]/g, "").replace(/\n/g, "").trim()}]`
        result += `(${$(row).attr('href')})`

        callback(result);
    })
}