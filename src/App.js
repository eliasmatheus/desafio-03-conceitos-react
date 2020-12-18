import React, { useEffect, useState } from 'react';

import './styles.css';

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // const title = document.querySelector('input').value;

    // if (!title) {
    //   return;
    // }

    const data = {
      title: 'Desafio ReactJS',
      url: 'https://github.com/eMatheus23/desafio-conceitos-node',
      techs: ['Node.js', '...'],
    };

    api.post('/repositories', data);

    // document.querySelector('input').value = '';

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repo, key) => {
          return (
            <li key={key}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      {/* <label htmlFor='title'></label>
      <input type='text' placeholder='Título' /> */}

      <button onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
}

export default App;
