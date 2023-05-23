const PORT = process.env.PORT || 8080;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const list = [];

// set url for all the videos
const url = 'https://atp.allthepreaching.com/atp/api';

axios
    .get(url)
    .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $('.video').each(function () {
            const id = $(this).find('#vidId').text();
            const vidCategory = $(this).find('#vidCategory').text();
            const searchCategory = $(this).find('#searchCategory').text();
            const preacher = $(this).find('#vidPreacher').text();
            const name = $(this).find('#vidName').text();
            const title = $(this).find('#vidTitle').text();
            const code = $(this).find('#vidCode').text();
            const date = $(this).find('#vidDate').text();
            const videoUrl = $(this).find('#vidUrl').text();
            const thumbUrl = $(this).find('#thumbUrl').text();
            const pictureUrl = $(this).find('#picUrl').text();
            const headerUrl = $(this).find('#headerUrl').text();

            list.push({
                id,
                vidCategory,
                searchCategory,
                preacher,
                name,
                title,
                code,
                date,
                videoUrl,
                thumbUrl,
                pictureUrl,
                headerUrl,
            });
        });
    })
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.json('Welcome to the ATP API');
});

app.get('/data', (req, res) => {
    res.json(list);
});

app.get('/data/:category', async (req, res) => {
    const category = req.params.category;

    axios
        .get(url)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const specificCategory = [];

            $('.video').each(function () {
                const id = $(this).find('#vidId').text();
                const vidCategory = $(this).find('#vidCategory').text();
                const searchCategory = $(this).find('#searchCategory').text();
                const preacher = $(this).find('#vidPreacher').text();
                const name = $(this).find('#vidName').text();
                const title = $(this).find('#vidTitle').text();
                const code = $(this).find('#vidCode').text();
                const date = $(this).find('#vidDate').text();
                const videoUrl = $(this).find('#vidUrl').text();
                const thumbUrl = $(this).find('#thumbUrl').text();
                const pictureUrl = $(this).find('#picUrl').text();
                const headerUrl = $(this).find('#headerUrl').text();
                if (vidCategory === category) {
                    specificCategory.push({
                        id,
                        vidCategory,
                        searchCategory,
                        preacher,
                        name,
                        title,
                        code,
                        date,
                        videoUrl,
                        thumbUrl,
                        pictureUrl,
                        headerUrl,
                    });
                }
            });
            res.json(specificCategory);
            console.log(specificCategory.name);
        })
        .catch((err) => console.log(err));
});

app.listen(PORT, () => {
    console.log(`ATP API listening at http://localhost:${PORT}`);
});
