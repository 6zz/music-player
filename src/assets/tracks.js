import coachella from './coachella_data.json';

const tracks = [];
let index = 0;

function getTracks() {
    coachella.forEach(artist => {
        Object.keys(artist)
            .filter(property => (property.match(/track[0-9]_name/)))
            .map((track) => {
                const trackData = {
                    id: index++,
                    // artist.track#_name
                    name: artist[track],
                    art: artist['artist_image_medium'],
                    // artist.track#_preview
                    audio: artist[track.replace('name', 'preview')]
                }
                return trackData;
            })
            .forEach(t => {tracks.push(t)});
    });

    return tracks;
}

export default getTracks();