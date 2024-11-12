const newFormHandler = async (event) => {
  event.preventDefault();
  
  const title = document.querySelector('#project-title').value.trim();
  const desc = document.querySelector('#project-desc').value.trim();
  const date = document.querySelector('#project-date').value.trim();

  if (title && desc && date) {

    const response = await fetch(`/api/posts`, {
      
      method: 'POST',
      body: JSON.stringify({ title, desc, date }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create posts');
    }
  }
};

const delButtonHandler = async (event) => {
  console.log("fff");
  
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    console.log(id);
    

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    console.log("response",response);
    

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete posts');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list-try')
  .addEventListener('click', delButtonHandler);
