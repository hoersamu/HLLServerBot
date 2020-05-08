(function () {
    const Discord = require('discord.js');
    const path = require('path');
    const foyPath = path.join(__dirname, '/images/foy.png');
    const hurtgenForestPath = path.join(__dirname, '/images/hurtgenForest.png');
    const omahaBeachPath = path.join(__dirname, '/images/omahaBeach.png');
    const purpleHeartLanePath = path.join(__dirname, '/images/purpleHeartLane.png');
    const stMarieDuMontPath = path.join(__dirname, '/images/stMarieDuMont.png');
    const stMereEglisePath = path.join(__dirname, '/images/stMereEglise.png');
    const utahBeachPath = path.join(__dirname, '/images/utahBeach.png');
    const hillPath = path.join(__dirname, '/images/hill.png');
    const logoPath = path.join(__dirname, '/images/logo.jpg');

    exports.ImageLoader = class ImageLoader {

        constructor() { }

        startUp() {
            return new Promise((resolve, reject) => {
                try {
                    this.loadImages();
                    resolve();
                } catch (imageLoaderError) {
                    reject(imageLoaderError);
                }
            })
        }

        loadImages() {
            //Maps
            if (foyPath == null)
                throw new Error('Missing foy image');
            if (hurtgenForestPath == null)
                throw new Error('Missing hurtgen image');
            if (omahaBeachPath == null)
                throw new Error('Missing omaha image');
            if (purpleHeartLanePath == null)
                throw new Error('Missing purple heart lane image');
            if (stMarieDuMontPath == null)
                throw new Error('Missing St. Marie image');
            if (stMereEglisePath == null)
                throw new Error('Missing St. Mere Eglise image');
            if (utahBeachPath == null)
                throw new Error('Missing Utah image');
            if (hillPath == null)
                throw new Error('Missing Hill 400 image');
            if (logoPath == null)
                throw new Error('Missing Logo image');
        }

        getFoyAttachment() {
            return new Discord.MessageAttachment(foyPath, 'map.png');
        }

        getHurtgenForestAttachment() {
            return new Discord.MessageAttachment(hurtgenForestPath, 'map.png');
        }

        getOmahaBeachAttachment() {
            return new Discord.MessageAttachment(omahaBeachPath, 'map.png');
        }

        getPurpleHeartLaneAttachment() {
            return new Discord.MessageAttachment(purpleHeartLanePath, 'map.png');
        }

        getStMarieDuMontAttachment() {
            return new Discord.MessageAttachment(stMarieDuMontPath, 'map.png');
        }

        getStMereEgliseAttachment() {
            return new Discord.MessageAttachment(stMereEglisePath, 'map.png');
        }

        getUtahBeachAttachment() {
            return new Discord.MessageAttachment(utahBeachPath, 'map.png');
        }

        getHillAttachment() {
            return new Discord.MessageAttachment(hillPath, 'map.png');
        }

        getLogoAttachment() {
            return new Discord.MessageAttachment(logoPath, 'logo.png');
        }
    }
})();