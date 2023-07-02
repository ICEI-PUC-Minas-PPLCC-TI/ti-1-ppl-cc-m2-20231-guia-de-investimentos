// Função para adicionar um novo comentário
function addComment(postId, comment) {
  const posts = getPosts();
  const post = posts.find(post => post.id === postId);
  
  if (post) {
    post.comments.push(comment);
    savePosts(posts);
    
    const postElement = document.getElementById(`post-${postId}`);
    const commentsElement = postElement.querySelector('.comments');
    const commentElement = document.createElement('p');
    commentElement.textContent = comment;
    commentsElement.appendChild(commentElement);
  }
}

// Função para adicionar um novo post
function addPost(username, content) {
  const postId = Date.now(); // Gerar um ID único para o post
  
  // Criar um objeto de post
  const post = {
    id: postId,
    username: username,
    content: content,
    comments: []
  };
  
  // Obter os posts existentes do armazenamento
  const posts = getPosts();
  
  // Adicionar o novo post à lista de posts
  posts.push(post);
  
  // Salvar os posts atualizados no armazenamento
  savePosts(posts);
  
  const postList = document.getElementById('postList');
  
  // Criar o elemento de post
  const postElement = document.createElement('div');
  postElement.classList.add('post');
  postElement.id = `post-${postId}`;
  
  // Criar elementos para mostrar os detalhes do post
  const usernameElement = document.createElement('h3');
  usernameElement.textContent = username;
  const dateElement = document.createElement('p');
  dateElement.textContent = formatDate();
  const contentElement = document.createElement('p');
  contentElement.textContent = content;
  
  // Criar elemento para os comentários
  const commentsElement = document.createElement('div');
  commentsElement.classList.add('comments');
  commentsElement.innerHTML = '<h4>Comentários:</h4>';
  
  // Criar formulário para adicionar comentário
  const commentForm = document.createElement('form');
  commentForm.classList.add('comment-form');
  commentForm.innerHTML = `
    <input type="text" class="comment-field" placeholder="Digite um comentário" required>
    <button type="submit">Comentar</button>
  `;
  
  // Associar a função de envio do formulário de comentário ao evento de submit
  commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const commentField = event.target.querySelector('.comment-field');
    const comment = commentField.value;
    addComment(postId, comment);
    commentField.value = '';
  });
  
  // Adicionar elementos ao post
  postElement.appendChild(usernameElement);
  postElement.appendChild(dateElement);
  postElement.appendChild(contentElement);
  postElement.appendChild(commentsElement);
  postElement.appendChild(commentForm);
  
  // Adicionar o post à lista de posts
  postList.appendChild(postElement);
}

// Função para formatar a data atual
function formatDate() {
  const date = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
}

// Função para obter os posts do armazenamento
function getPosts() {
  const storedPosts = localStorage.getItem('forum-posts');
  return storedPosts ? JSON.parse(storedPosts) : [];
}

// Função para salvar os posts no armazenamento
function savePosts(posts) {
  localStorage.setItem('forum-posts', JSON.stringify(posts));
}

// Função para lidar com o envio do formulário
function handleFormSubmit(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const content = document.getElementById('postContent').value;
  
  addPost(username, content);
  
  document.getElementById('postForm').reset();
}

// Associar a função de envio do formulário ao evento de submit
document.getElementById('postForm').addEventListener('submit', handleFormSubmit);
