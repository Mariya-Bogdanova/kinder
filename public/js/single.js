const stop = document.getElementById('stop');
const main = document.getElementById('main');

const audio = new Audio();

main?.addEventListener('click', async (event) => {
  try {
    if (event.target.className === 'imgPhoto') {
      event.preventDefault();
      const path = event.target.parentElement.href;
      const track = path.substr(21);
      audio.src = `/voice_acting${track}`;
      audio.play();
    }
  } catch (err) {
    console.error(err.message);
  }
});

stop?.addEventListener('click', async (event) => {
  try {
      event.preventDefault();
      audio.pause();
  } catch (err) {
    console.error(err.message);
  }
});
