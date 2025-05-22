import { Component, inject, OnInit } from '@angular/core';
import { Playlist } from '../../models/playlist';
import { PlaylistService } from '../../services/playlist.service';
import { Song } from '../../models/song';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  playlistService: PlaylistService = inject(PlaylistService);
  apiUrl = environment.apiUrl;

  id: number = 0;
  owner = "";
  image = "";
  title = "";
  songs: Song[] = [];
  song_index = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; // Convierte a número
      this.loadPlaylist();
    });
  }

  loadPlaylist(): void {
    this.playlistService.getById(this.id).subscribe({
      next: (data: Playlist) => {
        this.title = data.name || 'Sin título';
        this.image = data.image_path ? `${this.apiUrl}/${data.image_path}` : '/img/playlist_icon.jpg';
        this.owner = data.user?.username || 'Desconocido';
        this.songs = data.songs || [];
      },
      error: (err) => console.error('Error al cargar playlist:', err)
    });
  }

  selectSong(index: number): void {
    this.song_index = index;
    const song = this.songs[index];

    console.log('Reproduciendo:', song.title);
  }
}
