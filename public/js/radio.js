const checkBox = document.getElementById('checkBox')

checkBox?.addEventListener('click', async (event) => {
  try {
    if (event.target.id === 'fid-1') {
      return window.location.assign('/children');
    } else if (event.target.id === 'fid-2') {
      return window.location.assign('/parents');
    }
  } catch (err) {
    console.error(err.message);
  }
});
