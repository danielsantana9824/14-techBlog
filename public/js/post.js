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

async function deleteDan(id)  {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete posts');
    }
};

async function editPostView(post) {

  const response = await fetch(`/api/posts/${post}`);
 
  if (response.ok) {
    const post = await response.json();

    document.getElementById("edit-id").value = post.id;
    document.getElementById("edit-title").value = post.title;
    document.getElementById("edit-desc").value = post.desc;
    document.getElementById("edit-date").value = post.date.slice(0, 10);

    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    editModal.show();
  } else {
    alert("No se pudo cargar los datos del registro.");
  }
}

 async function editPost(){
  
  const idPost = document.getElementById("edit-id").value;
  const title = document.getElementById("edit-title").value;
  const desc = document.getElementById("edit-desc").value;
  const date = document.getElementById("edit-date").value;

 const response = await fetch(`/api/posts/${idPost}`, {
   method: "PUT",
   body: JSON.stringify({ title, desc, date }),
   headers: {
     "Content-Type": "application/json"
   }
 });

   if (response.ok) {
     $('#editModal').modal('hide');
     document.location.reload();
   } else {
     alert("Failed to update the post.");
   }
 }

 function closeModal(){
  document.location.reload();
 }

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list-try')
//   .addEventListener('click', delButtonHandler);
