import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  playlistService:PlaylistService=inject(PlaylistService);
  playlist_list:Playlist[]=[]
  apiUrl = environment.apiUrl;

  constructor(){
    this.playlistService.getAll().subscribe({
      next:(data:Playlist[])=>{
        this.playlist_list=data;
        //falta filtrar el user id de play list
      },
      error: (error: any) => {
          console.error(error);
      }
    })
  }
}
