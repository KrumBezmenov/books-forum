import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Post } from '../../types/post';
import { Theme } from 'src/app/types/theme';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css'],
})
export class RecentPostsComponent implements OnInit {
  themes: Theme[] = [];
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.getLatestThemes(3).subscribe((themes) => {
      console.log(themes);
      this.themes = themes;
    });
  }
}
