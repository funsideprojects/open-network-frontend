import React from 'react'
import { PlayCircle, PauseCircle, Infinite, Shuffle, ChevronDown, ChevronUp } from '@styled-icons/ionicons-outline'
import { PlaySkipBack, PlaySkipForward } from '@styled-icons/ionicons-solid'

import { PlayerBar, Button, SongNameContainer, SongName } from './MusicPlayer.styled'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isLoop, setIsLoop] = React.useState(false)
  const [isShuffle, setIsShuffle] = React.useState(false)
  const [isPlaylistOpen, setIsPlaylistOpen] = React.useState(false)

  return (
    <PlayerBar>
      <Button small>
        <PlaySkipBack />
      </Button>

      <Button active={isLoop} onClick={() => setIsLoop((prev) => !prev)}>
        <Infinite />
      </Button>

      <Button onClick={() => setIsPlaying((prev) => !prev)}>{isPlaying ? <PauseCircle /> : <PlayCircle />}</Button>

      <Button active={isShuffle} onClick={() => setIsShuffle((prev) => !prev)}>
        <Shuffle />
      </Button>

      <Button small>
        <PlaySkipForward />
      </Button>

      <SongNameContainer>
        <SongName isPlaying={isPlaying}>asdkal das aksj dakjsdh ajshdk ad</SongName>
      </SongNameContainer>

      <Button small onClick={() => setIsPlaylistOpen((prev) => !prev)}>
        {isPlaylistOpen ? <ChevronUp /> : <ChevronDown />}
      </Button>
    </PlayerBar>
  )
}

export default MusicPlayer
