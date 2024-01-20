import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPostService } from '../../blog-post/blog-post.service';
import { BlogPost } from '../../blog-post/models/blog-post-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  blogs$?: Observable<BlogPost[]>;
  constructor(private blogPostService: BlogPostService) { }

  ngOnInit(): void {
    this.blogs$ = this.blogPostService.getAllBlogPosts();
  }
}
