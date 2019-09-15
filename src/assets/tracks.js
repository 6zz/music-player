import coachella from './coachella_data.json';

function getTracks() {
    return coachella.map(artist => {
        return Object.keys(artist)
            .filter(property => (property.match(/track[0-9]_name/)))
            .map((track, index) => {
                const trackData = {
                    id: index,
                    // artist.track#_name
                    name: artist[track],
                    art: artist['artist_image_medium'],
                    // artist.track#_preview
                    audio: artist[track.replace('name', 'preview')]
                }
                return trackData;
            })
    });
}

export default getTracks();