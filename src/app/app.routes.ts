import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlbumComponent } from './pages/album/album.component';
import { AlbumRegisterComponent } from './pages/album-register/album-register.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { ArtistRegisterComponent } from './pages/artist-register/artist-register.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { PlaylistRegisterComponent } from './pages/playlist-register/playlist-register.component';
import { SongComponent } from './pages/song/song.component';
import { SongRegisterComponent } from './pages/song-register/song-register.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { AlbumListComponent } from './pages/album-list/album-list.component';
import { ArtistListComponent } from './pages/artist-list/artist-list.component';
import { SongListComponent } from './pages/song-list/song-list.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
    { path: '', component: HomeComponent , pathMatch: 'full' },

    { path: 'albums', component: AlbumListComponent },
    { path: 'album/:id', component: AlbumComponent },
    { path: 'album-register', component: AlbumRegisterComponent },
    { path: 'album-register/:id', component: AlbumRegisterComponent },

    { path: 'artists', component: ArtistListComponent },
    { path: 'artist/:id', component: ArtistComponent },
    { path: 'artist-register', component: ArtistRegisterComponent },
    { path: 'artist-register/:id', component: ArtistRegisterComponent },

    { path: 'playlist/:id', component: PlaylistComponent },
    { path: 'playlist-register', component: PlaylistRegisterComponent },
    { path: 'playlist-register/:id', component: PlaylistRegisterComponent },

    { path: 'songs', component: SongListComponent },
    { path: 'song/:id', component: SongComponent },
    { path: 'song-register', component: SongRegisterComponent },
    { path: 'song-register/:id', component: SongRegisterComponent },

    { path: 'user', component: UserComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'settings', component: SettingsComponent}
];
