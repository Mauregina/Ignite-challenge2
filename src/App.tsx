import { useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

interface GenreResponseProps {
  title: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    
    api.get<GenreResponseProps>(`genres/${id}`).then(response => {
      setSelectedGenre(response.data);
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
      />
      <Content
        genreId={selectedGenreId}
        selectedGenre={selectedGenre}
      />
    </div>
  )
}