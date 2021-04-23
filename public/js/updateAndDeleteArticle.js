const ul = document.getElementsByTagName('ul');

document.forms.updateAnimalForm?.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();
    const response = await fetch(event.target.action, {
      method: "PUT",
      body: new FormData(event.target)
    });
    return window.location.assign('/parents');
  } catch (err) {
    console.error(err.message);
  }
});

ul[0]?.addEventListener('click', async (event) => {
  try {
    if (event.target.className === 'delImg') {
      event.preventDefault();
      const response = await fetch(event.target.parentElement.href, {
        method: 'DELETE',
      });
      return window.location.assign('/parents');
    }
  } catch (err) {
    console.error(err.message);
  }
})
