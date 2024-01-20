import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post-model';
import { BlogPostService } from '../blog-post.service';

@Component({
  selector: 'app-blogposts-list',
  templateUrl: './blogposts-list.component.html',
  styleUrl: './blogposts-list.component.css'
})
export class BlogpostsListComponent implements OnInit {

  blogPosts$?: Observable<BlogPost[]>;

  constructor(private blogPostService: BlogPostService) {

  }

  ngOnInit(): void {
    // get all blog posts from API
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }

}