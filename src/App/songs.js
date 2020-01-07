export const songs = [
    {
        id: 1,
        songName: "Лети",
        artistName: "ELMAN",
        src: "/songs/ELMAN - Лети.mp3",
        hashtag:"pop",
        artistImg:"/artistsImg/Elman.jpg",
        likes: 10,
    }
,
    {
        id: 2,
        songName: "Лети",
        artistName: "ELMAN",
        src: "/songs/ELMAN - Лети.mp3",
        hashtag:"pop",
        artistImg:"/artistsImg/Elman.jpg",
        likes: 20,
    }
,
    {
        id: 3,
        songName: "Life",
        artistName: "Zivert",
        src: "/songs/Zivert - Life.mp3",
        hashtag:"pop",
        artistImg:"/artistsImg/Zivert.jpg",
        likes: 5,
    }
];

export const artistsArray = [];

songs.reduce(function(res, value) {
    if (!res[value.artistName]) {
        res[value.artistName] = { artistName: value.artistName, likes: 0, artistImg: value.artistImg };
        artistsArray.push(res[value.artistName])
    }
    res[value.artistName].likes += value.likes;
    return res;
    }, {});

artistsArray.sort(function (a,b){return b.likes-a.likes});
