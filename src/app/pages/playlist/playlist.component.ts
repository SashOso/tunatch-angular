import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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
  song_index = -1;

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
        this.image = data.image_path || '';
        this.owner = data.user?.username || 'Desconocido';
        this.songs = data.songs || [];
      },
      error: (err) => console.error('Error al cargar playlist:', err)
    });
  }
  
  formatTime(seconds: number): string {
    if (!seconds && seconds !== 0) return '--:--';

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const hh = h > 0 ? `${h.toString().padStart(2, '0')}:` : '';
    const mm = m.toString().padStart(2, '0');
    const ss = s.toString().padStart(2, '0');

    return `${hh}${mm}:${ss}`;
  }

  /*---------------------------------------*/
  @ViewChild('player', { static: true }) playerRef!: ElementRef<HTMLAudioElement>;
  paused=true;
  muted=false;
  volume=.5;
  previousVolume = 1;
  duration=1200;
  currentTime=0;

  selectSong(index: number): void {
    this.song_index = index;
    const song = this.songs[index];
    const file_path = song.file_path;

    const media = this.playerRef.nativeElement;//le quite la ruta de api
    media.src = file_path;
    media.load();

    this.paused = false;
    media.volume = this.volume;
    media.muted = this.muted;

    media.onloadedmetadata = () => {
      media.play().catch(err => console.warn('Play error:', err));
    };
  }

  play(): void {
    this.paused = !this.paused;
    const media = this.playerRef.nativeElement;

    if (this.paused) {
      media.pause();
    } else {
      media.play();
    }
  }

  mute(): void {
    this.muted = !this.muted;
    const media = this.playerRef.nativeElement;

    if (this.muted) {
      this.previousVolume = this.volume;
      this.volume = 0;
    } else {
      this.volume = this.previousVolume || 1;
    }

    media.volume = this.volume;
  }

  next():void{
    let next_index=this.song_index+1;
    if(next_index>this.songs.length-1){
      next_index=0;
    }
    this.selectSong(next_index)
  }

  previous():void{
    let next_index=this.song_index-1;
    if(next_index<0){
      next_index=this.songs.length-1;
    }
    this.selectSong(next_index)
  }

  

  onSeek(event: Event): void {//acualizar el 
    const input = event.target as HTMLInputElement;
    const seekTime = +input.value;
    const media = this.playerRef.nativeElement;

    media.currentTime = seekTime;
    this.currentTime = seekTime;
  }

  onVolumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.volume = +input.value / 100;
    this.playerRef.nativeElement.volume = this.volume;
  }

  ngAfterViewInit(): void {
    const media = this.playerRef.nativeElement;

    media.addEventListener('loadedmetadata', () => {
      this.duration = media.duration;
    });

    media.addEventListener('timeupdate', () => {
      this.currentTime = media.currentTime;
    });

    media.addEventListener('ended', () => {
      this.next();
    });
  }
  
}
